import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const Rightbar = () => {
    return (
        <div className={ "" }>
            <div className={ "" }>
                <div className={ "" }>
                    <img src="/astronaut.png" alt="" fill />
                </div>
                <div className={ "" }>
                    <span className={ "" }>🔥 Available Now</span>
                    <h3 className={ "" }>
                        How to use the new version of the admin dashboard ?
                    </h3 >
                    <span className={ "" }> Takes 4 minutes to learn</span >
                    <p className={ "" }>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit eius libero perspiciatis recusandae possimus.
                    </p>
                    <button className={ "" }>
                        <MdPlayCircleFilled />
                        Watch
                    </button >
                </div >
            </div >
            <div className={ "" }>
                <div className={ "" }>
                    <span className={ "" }>🚀 Coming Soon</span>
                    <h3 className={ "" }>
                        New server actions are available, partial pre-rendering is coming
                        up!
                    </h3>
                    <span className={ "" }>Boost your productivity</span>
                    <p className={ "" }>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit eius libero perspiciatis recusandae possimus.
                    </p>
                    <button className={ "" }>
                        <MdReadMore />
                        Learn
                    </button>
                </div >
            </div >
        </div >
    );
};

export default Rightbar;