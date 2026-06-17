import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/login/index.jsx";
import Cadastro from "./pages/cadastro/index.jsx";
import Appointments from "./pages/appointments/index.jsx";
import AppointmentAdd from "./pages/appointments-add/index.jsx";

import { NewAppProvider } from "./context/Newappointments.jsx";
import { RoutesProtect } from "./RoutesProtect.jsx";
import { UserProvider } from "./context/UserLogin.jsx";
import { ProviderDeleteAppointments } from "./context/Deleteappointments.jsx";
import PageMecanicos from "./pages/mecanicos/index.jsx";
import { Pageservice } from "./pages/service/index.jsx";
import { MecanicosProvider } from "./context/Mecanicos.jsx";
import ServiceAdd from "./pages/service-add/index.jsx";
import MecanicosAdd from "./pages/mecanicos-add/index.jsx";

export const Rotas = () => {
    return (
        <UserProvider>
            <MecanicosProvider>
                <ProviderDeleteAppointments>
                    <NewAppProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Login></Login>}></Route>
                                <Route path="/singup" element={<Cadastro></Cadastro>}></Route>
                                <Route path='/appointments' element={
                                    <RoutesProtect>
                                        <Appointments></Appointments>
                                    </RoutesProtect>
                                }></Route>
                                <Route path="/appointments/add" element={

                                    <RoutesProtect>
                                        <AppointmentAdd></AppointmentAdd>
                                    </RoutesProtect>

                                }></Route>
                                <Route path="/appointments/edit/:id_appointement" element={
                                    <NewAppProvider>
                                        <RoutesProtect>
                                            <AppointmentAdd></AppointmentAdd>
                                        </RoutesProtect>
                                    </NewAppProvider>
                                }></Route>
                                <Route path="/mecanicos" element={
                                    <RoutesProtect>
                                        <PageMecanicos></PageMecanicos>
                                    </RoutesProtect>
                                }>
                                </Route>
                                <Route path="/mecanicos/add" element={
                                    <RoutesProtect>
                                        <MecanicosAdd></MecanicosAdd>
                                    </RoutesProtect>
                                }>
                                </Route>
<<<<<<< HEAD
=======
                                <Route path="/mecanicos/add/:id_mecanico" element={
                                    <RoutesProtect>
                                        <MecanicosAdd></MecanicosAdd>
                                    </RoutesProtect>
                                }>
                                </Route>
>>>>>>> e1b826c (update 3.6)
                                <Route path="/services" element={
                                    <RoutesProtect>
                                        <Pageservice></Pageservice>
                                    </RoutesProtect>
                                }>
                                </Route>
                                <Route path="/services/add" element={
                                    <RoutesProtect>
                                        <ServiceAdd></ServiceAdd>
                                    </RoutesProtect>
                                }>
                                </Route>
                                <Route path="/services/add/:id_service" element={
                                    <RoutesProtect>
                                        <ServiceAdd></ServiceAdd>
                                    </RoutesProtect>
                                }>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </NewAppProvider>
                </ProviderDeleteAppointments>
            </MecanicosProvider>
        </UserProvider>
    )
}
