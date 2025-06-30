import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { ConfigPage } from "../../pages/ConfigPage";
import { TermsAndConditionsPage } from "../../pages/TermsAndConditionsPage";
import { EvaluationPage } from "../../pages/EvaluationPage";
import { SampleEvaluationResumePage } from "../../pages/SampleEvaluationResumePage";
import { LocationEvaluationResumePage } from "../../pages/LocationEvaluationResumePage";
import { HistoryPage } from "../../pages/HistoryPage";
import { QEVessPage } from "../../pages/QEVessPage";
import { GenericInfoPage } from "../../pages/GenericInfoPage";
import { NavBar } from "../../components/NavBar";

export function BaseRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/configuracoes" element={<ConfigPage />} />
        <Route path="/termos-condicoes" element={<TermsAndConditionsPage />} />
        <Route path="/avaliacoes" element={<EvaluationPage />} />
        <Route path="/resumo-avaliacoes-amostra" element={<SampleEvaluationResumePage />} />
        <Route path="/resumo-avaliacoes-local" element={<LocationEvaluationResumePage />} />
        <Route path="/historico-avaliacoes" element={<HistoryPage />} />
        <Route path="/qualidade-estrutural-vess" element={<QEVessPage />} />
        <Route path="/info/:pageId" element={<GenericInfoPage />} />
      </Routes>
    </>
  );
}