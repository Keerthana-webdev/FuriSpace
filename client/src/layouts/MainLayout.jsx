import { Outlet } from "react-router-dom";

function MainLayout() {

    return (
        <>
            <h2>Navbar</h2>
            <Outlet />
            <h2>Footer</h2>
        </>
    );
}

export default MainLayout;