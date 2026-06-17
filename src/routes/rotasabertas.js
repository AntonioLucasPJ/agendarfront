import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../screens/Login/index.jsx";
import  Cadastro from "../screens/Cadastro/index.jsx";
const Stack = createNativeStackNavigator();
function RotasOpen(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="login" component={Login}
            options={{
                headerShown:false
            }}></Stack.Screen>
            <Stack.Screen 
            name="cadastro" 
            component={Cadastro}
            options={{
                headerShown:false
            }}></Stack.Screen>
        </Stack.Navigator>
    )
}
export default RotasOpen