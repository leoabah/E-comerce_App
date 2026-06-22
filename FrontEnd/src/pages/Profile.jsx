import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { h1 } from "framer-motion/client";


export default function Profile() {

    const { user } = useContext(AuthContext);

    return(
        <div className="profile-page">

            <h1>Perfil</h1>

            <div className="profile-card">

                <p>
                    <strong>Nombre:</strong>
                    {" "}
                    {user?.name}
                </p>
                <p>
                    <strong>Email:</strong>
                    {" "}
                    {user?.email}
                </p>
                <p>
                    <strong>Rol:</strong>
                    {" "}
                    {user?.role}
                </p>

            </div>

        </div>
    );
}
