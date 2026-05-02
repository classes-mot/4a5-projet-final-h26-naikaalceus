import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

const MainNavigation = () => {

    const auth = useContext(AuthContext);
    return (
        <>

            <header>
                <h1>
                    {!auth.logged ? (
                        <>
                            <li>
                                <Link to="/menu">Menu</Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/songs">Menu</Link>
                        </li>
                    )}
                </h1>
            </header>

        </>
    );
};

export default MainNavigation;