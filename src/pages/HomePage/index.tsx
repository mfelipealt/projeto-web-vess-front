
export function HomePage() {

    return (
        <>
            <div className="container">
                <h1 className="text-center">VESS</h1>
                <div className="col-12 mb-3">
                    <button>Avaliar</button>
                </div>
                <div className="col-12 mb-3">
                    <h3 className="text-center">Processo de avaliação</h3>
                    <button>Equipamentos</button>
                    <button>Onde Amostrar</button>
                    <button>Quando Amostrar</button>
                    <button>Extração da Amostra</button>
                    <button>Fragmentação da Amostra</button>
                    <button>Escores VESS</button>
                </div>
                <div className="col-12 mb-3">
                    <h3 className="text-center">Extras</h3>
                    <button>Decisão de Manejo</button>
                    <button>Informações Complementares</button>
                    <button>Oque é o VESS</button>
                    <button>Minhas Avaliações</button>
                    <button>Sobre o App</button>
                    <button>Configurações</button>
                </div>
            </div>
        </>
    )
}