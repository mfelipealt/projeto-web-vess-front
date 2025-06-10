import { Button } from "@chakra-ui/react";
import { CardMenu } from "../../components/CardMenu";

export function HomePage() {

    return (
        <>
            <div className="container">
                <h1 className="text-center">VESS</h1>
                <div className="col-12 mb-3">
                <CardMenu></CardMenu>
                </div>
                <div className="col-12 mb-3">
                    <h3 className="text-center">Processo de avaliação</h3>
                    <Button>Equipamentos</Button>
                    <Button>Onde Amostrar</Button>
                    <Button>Quando Amostrar</Button>
                    <Button>Extração da Amostra</Button>
                    <Button>Fragmentação da Amostra</Button>
                    <Button>Escores VESS</Button>
                </div>
                <div className="col-12 mb-3">
                    <h3 className="text-center">Extras</h3>
                    <Button>Decisão de Manejo</Button>
                    <Button>Informações Complementares</Button>
                    <Button>Oque é o VESS</Button>
                    <Button>Minhas Avaliações</Button>
                    <Button>Sobre o App</Button>
                    <Button>Configurações</Button>
                </div>
            </div>
        </>
    )
}