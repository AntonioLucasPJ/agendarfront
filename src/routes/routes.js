import { Text, View } from "react-native"
import RotasPrivadas from "./rotasprivadas.js"
import RotasOpen from "./rotasabertas.js"
import { AuthContext } from "../contexts/auth.js"
import { useContext } from "react"
function Routes(){
    const {user} = useContext(AuthContext);
    
    return user.id_user?<RotasPrivadas></RotasPrivadas>:<RotasOpen></RotasOpen>
}

export default Routes