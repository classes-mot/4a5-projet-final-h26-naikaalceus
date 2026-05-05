import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../context/auth-context";
import RootLayout from "../Containers/Roots";
import ErrorPage from "../Containers/Roots";
import Auth from "../Containers/Auth";
import Subscribe from "../Containers/Subscribe";
import NewSong from "../Containers/NewSong";
import NewTicket from "../Containers/NewTicket";
import UpdateSong from "../Containers/UpdateSong";
import UpdateTicket from "../Containers/UpdateTicket";
import SongCards from "../Containers/SongCards";
import TicketCards from "../Containers/TicketCards";
import Acceuil from "../Containers/Acceuil";

const App = () => {

    const storedUserId = sessionStorage.getItem('userId');
    const storedUserEmail = sessionStorage.getItem('userEmail');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(storedUserId);
    const [userEmail, setUserEmail] = useState(storedUserEmail);

    const login = (userId, email) => {
        setIsLoggedIn(true);
        setUserId(userId);
        setUserEmail(email);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('userEmail', email);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserId(null);
        setUserEmail(null);
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userEmail');
    };

    const routerIsLoggedIn = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                { path: "/", element: <Acceuil /> },
                { path: "songs", element: <SongCards /> },
                { path: "tickets", element: <TicketCards /> },
                { path: "newSong", element: <NewSong /> },
                { path: "edit/:songId", element: <UpdateSong /> },
                { path: "newTicket", element: <NewTicket /> },
                { path: "edit/:ticketId", element: <UpdateTicket /> },
                { path: "auth", element: <Navigate to="/" replace /> },
                { path: "subscribe", element: <Navigate to="/" replace /> },
            ],
        },
    ]);

    const routerIsNotLoggedIn = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                { path: "/", element: <Acceuil /> },
                { path: "auth", element: <Auth /> },
                { path: "subscribe", element: <Subscribe /> },
                { path: "newSong", element: <Navigate to="/auth" replace /> },
                { path: "edit/:songId", element: <Navigate to="/auth" replace /> },
                { path: "newTicket", element: <Navigate to="/auth" replace /> },
                { path: "edit/:ticketId", element: <Navigate to="/auth" replace /> },

            ],
        },
    ]);

    const authContextValue = {
        loggedIn: isLoggedIn,
        userId: userId,
        email: userEmail,
        login: login,
        logout: logout
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            <RouterProvider router={isLoggedIn ? routerIsLoggedIn : routerIsNotLoggedIn} />;
        </AuthContext.Provider>
    )
}

export default App;