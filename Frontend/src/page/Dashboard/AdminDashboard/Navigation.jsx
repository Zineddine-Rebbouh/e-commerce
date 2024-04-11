import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
    MdSearch,
} from "react-icons/md";

const Navigation = ( { activeSection } ) => {

    return (
        <div className={ 'p-5 rounded-lg bg-white flex items-center justify-between' }>
            <div className={ 'text-black font-bold capitalize text-xl' }>{ activeSection.split( "/" ).pop() }</div>
            <div className={ 'flex items-center gap-5 ' }>
                <div className={ 'flex items-center gap-2.5 p-2.5 rounded-md bg-[#2e374a] ' }>
                    <MdSearch />
                    <input type="text" placeholder="Search..." className={ 'bg-transparent border-none text-white ' } />
                </div>
                <div className={ 'flex gap-5' }>
                    <MdOutlineChat size={ 20 } />
                    <MdNotifications size={ 20 } />
                    <MdPublic size={ 20 } />
                </div>
            </div>
        </div>
    );
};

export default Navigation;