import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as apiClient from '../../api/api-Client';
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { categoriesData } from "../../constants/data"; // Import categoriesData
import { useSelector } from "react-redux";

const AddProduct = ( { onClose } ) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ loading, setLoading ] = useState( false );
  const { user } = useSelector( ( state ) => state.user );

  const { data: categories } = useQuery( "categories", apiClient.getCateogries );
  console.log( categories );
  const { mutate } = useMutation( apiClient.addProdcut, {
    onError: ( error ) => {
      toast.error( error.message, {
        position: "top-center",
        autoClose: 2200,
      } );
    },
    onSuccess: async () => {
      console.log( 'added product successfully' );
    },
  } );

  // const handleColorChange = ( e ) => {
  //   const { value } = e.target;
  //   if ( selectedColors.includes( value ) )
  //   {
  //     setSelectedColors( selectedColors.filter( color => color !== value ) );
  //   } else
  //   {
  //     setSelectedColors( [ ...selectedColors, value ] );
  //   }
  // };

  const onSubmit = handleSubmit( ( data ) => {
    try
    {
      setLoading( true );
      const formData = new FormData();
      formData.append( "name", data.productName );
      formData.append( "description", data.Description );
      formData.append( "price", data.Price );
      formData.append( "category", data.Category );
      formData.append( "quantity", data.Quantity );
      formData.append( "discount", data.Discount );
      formData.append( "url", data.avatar[ 0 ] );
      // formData.append( "colors", JSON.stringify( selectedColors ) );
      formData.append( "userId", user._id );
      mutate( formData );
      setLoading( false );
      toast.success( 'Added product success', {
        position: "top-center",
        autoClose: 2000,
      } );

      setTimeout( () => {
        onClose();
      }, 2005 );

    } catch ( error )
    {
      console.error( "Error adding product:", error );
    }
  } );


  return (
    <div className="fixed top-0 left-0 w-full min-h-screen flex justify-center items-center z-50" >
      <ToastContainer
        position="top-center"
        autoClose={ 2200 }
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-65 "></div>
      <div className="z-50 bg-white py-4 px-8 rounded-lg overflow-auto">
        <form className="w-[600px]" onSubmit={ onSubmit }>
          <div className="flex items-center justify-end px-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={ onClose }>X</button>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Product Name
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="productName"
                placeholder="Product Name"
                { ...register( "productName", { required: "productName is required" } ) }
              />

            </div>
            { errors.productName && <span className="text-red-500">{ errors.productName.message }</span> }

          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Description
              </label>
              <textarea
                className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-password"
                type="text"
                placeholder="Description"
                name="Description"
                { ...register( "Description", { required: "Description is required" } ) }
              />
            </div>
            { errors.Description && <span className="text-red-500">{ errors.Description.message }</span> }
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Price
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-password"
                type="text"
                name="Price"
                placeholder="Price"
                { ...register( "Price", { required: "Price is required" } ) } // Custom error message for required field
              />
            </div>
            { errors.Price && <span className="text-red-500">{ errors.Price.message }</span> }
          </div>
          {/* <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="colors"
              >
                Colors
              </label>
              <div className="grid grid-cols-3 gap-2">
                { [ "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink", "Black", "White" ].map( ( color ) => (
                  <label key={ color } className="flex items-center">
                    <input
                      type="checkbox"
                      value={ color }
                      checked={ selectedColors.includes( color ) }
                      onChange={ handleColorChange }
                      className="mr-2"
                      name="Colors"
                    />
                    { color }
                  </label>
                ) ) }
                { errors.Colors && <span className="text-red-500">{ errors.Colors.message }</span> }
              </div>
            </div>
          </div> */}
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="category"
                name="Category"
                { ...register( "Category", { required: "Category is required" } ) }
              >
                <option value="">Select category</option>
                { categories?.map( category => (
                  <option key={ category._id } value={ category.name }>{ category.name }</option>
                ) ) }
              </select>
              { errors.Category && <span className="text-red-500">{ errors.Category.message }</span> }
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"

              >
                Quantity
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-password"
                type="text"
                name="Quantity"
                placeholder="Quantity"
                { ...register( "Quantity", { required: "Quantity is required" } ) }
              />
            </div>
            { errors.Quantity && <span className="text-red-500">{ errors.Quantity.message }</span> }

          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Discount
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-password"
                type="text"
                name="Discount"
                placeholder="Discount"
                { ...register( "Discount", { required: "Discount is required" } ) }
              />
            </div>
            { errors.Discount && <span className="text-red-500">{ errors.Discount.message }</span> }
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 ">
              <label
                htmlFor="file-input"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span>Upload a file</span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  className="sr-only w-full "
                  { ...register( "avatar", { required: "avatar is required" } ) }

                />
              </label>
              { errors.name && <span className="text-red-500">{ errors.name.message }</span> }
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                { loading ? "Adding..." : "Add Product" }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div >
  );
};

export default AddProduct;