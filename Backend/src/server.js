const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const userRoutes = require("./routes/userRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const productsRoutes = require("./routes/productRoutes");
const ShopRoutes = require("./routes/ShopRoutes");
const ErrorHandler = require("./utils/ErrorHandler");
const User = require("./models/User");
const Order = require("./models/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const payload = req.body;
    let event;
    console.log("Webhook called");

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      console.log("event here :");
      console.log(event);
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const customer = {
          ClientId: session.client_reference_id,
          email: session.customer_email,
          name: session.customer_name,
        };

        const shippingAddress = {
          street: session?.customer_details?.address?.line1,
          city: session?.customer_details?.address?.city,
          state: session?.customer_details?.address?.state || "N/A",
          postalCode: session?.customer_details?.address?.postal_code,
          country: session?.customer_details?.address?.country,
        };

        const retrieveSession = await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: ["line_items.data.price.product"],
          }
        );
        console.log(retrieveSession);

        const lineItems = await retrieveSession?.line_items?.data;

        console.log(lineItems);
        const orderItems = lineItems?.map((item) => {
          console.log(item.price.product);
          console.log(item.price.product.metadata);
          return {
            productId: new mongoose.Types.ObjectId(
              item.price.product.metadata.productId
            ),
            name: item.price.product.name,
            image: item.price.product.metadata.url || "N/A",
            quantity: item.quantity,
            price: item.price.unit_amount,
          };
        });

        const newOrder = new Order({
          userId: customer.ClientId,
          orderItems: orderItems,
          shippingAddress: shippingAddress,
          shippingRate: session?.shipping_cost?.shipping_rate,
          paymentMethod: session.payment_method_types[0],
          paymentResult: {
            id: session.payment_intent,
            status: session.payment_status,
            update_time: session.payment_intent,
            email_address: session.customer_email,
          },
          taxPrice: session.total_details.amount_tax / 100,
          shippingPrice: session.total_details.amount_shipping / 100,
          totalPrice: session.amount_total ? session.amount_total / 100 : 0,
          isPaid: true,
          paidAt: Date.now(),
          isDelivered: false,
          deliveredAt: null,
        });

        await newOrder.save();

        let user = await User.findOne({ _id: customer.ClientId });

        if (user) {
          user.orders.push(newOrder._id);
        } else {
          customer = new User({
            ...user,
            orders: [newOrder._id],
          });
        }

        await user.save();

        return res.status(200).json("Order created");
      }
      // Fulfill the purchase...
    } catch (err) {
      console.log(err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/shop", ShopRoutes);
// app.use("/api/orders", require("./routes/ordersRoutes"))
// app.use("/api/cart", require("./routes/cartRoutes"))
// app.use("/api/addresses", require("./routes/addressesRoutes"))
// app.use("/api/payment", require("./routes/paymentRoutes"))

app.use(ErrorHandler);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDIANRY_API_SECRET,
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
