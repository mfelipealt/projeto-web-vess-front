import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { ConfigPage } from "../../pages/ConfigPage";
import { TermsAndConditionsPage } from "../../pages/TermsAndConditionsPage";
import { EvaluationPage } from "../../pages/EvaluationPage";
import { SampleEvaluationResumePage } from "../../pages/SampleEvaluationResumePage";
import { LocationEvaluationResumePage } from "../../pages/LocationEvaluationResumePage";
import { HistoryPage } from "../../pages/HistoryPage";

export function BaseRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/configuracoes" element={<ConfigPage />} />
        <Route path="/termos-condicoes" element={<TermsAndConditionsPage />} />
        <Route path="/avaliacoes" element={<EvaluationPage />} />
        <Route path="/resumo-avaliacoes-amostra" element={<SampleEvaluationResumePage />} />
        <Route path="/resumo-avaliacoes-local" element={<LocationEvaluationResumePage />} />
        <Route path="/historico-avaliacoes" element={<HistoryPage />} />
      </Routes>
    </>
  );
}