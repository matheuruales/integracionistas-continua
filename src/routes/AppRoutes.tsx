import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views
import HomePage from "../views/HomePage";
import ThreeDemoView from "../views/ThreeDemoView";
import LayoutsView from "../views/LayoutsView";
import SpeechDemoView from "../views/SpeechDemoView";
import GeometryExplorer from "../views/GeometryExplorer";
import SettingsView from "../views/SettingsView";
import TablasMul from "../views/TablasMul";
import ConversorUnid from "../views/ConversorUnid";
import ValidContrasena from "../views/ValidContrasena";
import ContadorClics from "../views/ContadorClics";
import ListaTareas from "../views/ListaTareas";
import RandomNumberView from "../views/RandomNumberView";
import SurveyView from "../views/SurveyView";
import ShoppingCartView from "../views/ShoppingCartView";
import RegisterFormView from "../views/RegisterFormView";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="three" element={<ThreeDemoView />} />
        <Route path="layouts" element={<LayoutsView />} />
        <Route path="tts" element={<SpeechDemoView />} />
        <Route path="three_2" element={<GeometryExplorer />} />
        <Route path="settings" element={<SettingsView />} />
        <Route path="tablasmul" element={<TablasMul />} />
        <Route path="conversorunid" element={<ConversorUnid />} />
        <Route path="validcontrasena" element={<ValidContrasena />} />
        <Route path="contadorclics" element={<ContadorClics />} />
        <Route path="listareas" element={<ListaTareas />} />
        <Route path="random" element={<RandomNumberView />} />
        <Route path="survey" element={<SurveyView />} />
        <Route path="cart" element={<ShoppingCartView />} />
        <Route path="register" element={<RegisterFormView />} />

      </Route>
    </Routes>
  );
}