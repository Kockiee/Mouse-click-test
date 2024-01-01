'use client'
import { useEffect, useState } from 'react';
import TestButton from './components/TestButton';

export default function Home() {
  const [testTemp, setTestTemp] = useState<number>(10);
  const [inTest, setInTest] = useState<boolean>(false);
  const [clicks, setClicks] = useState<number>(0);
  const [clock, setClock] = useState<number>(0);
  const [isFinalized, setIsFinalized] = useState<boolean>(false)
  const CPS = clicks && clicks / testTemp
  const commemorationText = CPS && (
  CPS < 4 ? 'Muito lento, mas devagar pode-se ir longe.' : 
  CPS > 4 && CPS < 8 ? 'Rápido, mas não muito, melhore isso !' :
  CPS > 8 && CPS < 12 ? 'Muito Bom, mas ainda não gostei !' : 
  CPS > 12 && CPS < 105.1 ? 'Você realmente é bom nos clicks, como você treina isso em ?.' :
  'Minha nossa você bateu o recorde mundial, meus parabéns ! Espero que tenha gravado 🙃'
  )

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (inTest) {
      setClock(testTemp);

      interval = setInterval(() => {
        setClock((prevClock) => prevClock! - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        setInTest(false);
        setIsFinalized(true)
      }, testTemp * 1000);
    }

    return () => clearInterval(interval);
  }, [inTest]);

  const handleClickTest = () => {
    if (!inTest) {
      setClicks(0);
    }
    setInTest(true);
    setClicks((prevClicks) => (prevClicks! + 1));
  };

  const handleTestButtonClick = (value:number) => {
    setTestTemp(value)
    setInTest(false)
    setIsFinalized(false)
    setClicks(0)
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4 p-24">
      <h1 className="text-3xl font-bold mb-4">Contador de Cliques por Segundo</h1>
      <p className="text-lg mb-8">Clique abaixo para começar a contagem.</p>
      {isFinalized && (
        <div className='fixed z-10 top-48 w-full'>
          <div 
          className='relative bg-slate-700 rounded p-2 shadow-lg shadow-blue-600/20 border border-slate-700 w-full h-[400px] flex flex-col justify-center items-center select-none'
          >
            <button 
            onClick={() => setIsFinalized(false)}
            className='bg-white p-2 rounded-full w-6 h-6 text-slate-700 flex justify-center items-center font-black absolute top-4 right-4'
            >x</button>
            <p className='text-xl font-bold'>{commemorationText}</p>
            <p className='text-lg'>Seu CPS (clicks por segundo): <span className='font-bold'>{CPS} clicks/s</span></p>
            <p className='text-lg'>Você clicou {clicks} vezes em {testTemp} segundos</p>
          </div>
        </div>
      )}
      <div onClick={handleClickTest} className='rounded bg-slate-800 p-2 shadow border border-slate-700 w-full h-[400px] flex flex-col justify-center items-center select-none cursor-pointer'>
        <p className='text-slate-400'>\&gt; Começe a clicar !</p>
        <p>Clicks no intervalo selecionado: {clicks}</p>
      </div>
      <p>Tempo: {clock}seg</p>
      <p>Escolha o tempo do teste</p>
      <div className='rounded max-w-2xl bg-slate-800 border border-slate-700 shadow'>
        <TestButton onClick={() => handleTestButtonClick(1)} value={1} testTemp={testTemp} />
        <TestButton onClick={() => handleTestButtonClick(5)} value={5} testTemp={testTemp} />
        <TestButton onClick={() => handleTestButtonClick(10)} value={10} testTemp={testTemp} />
        <TestButton onClick={() => handleTestButtonClick(15)} value={15} testTemp={testTemp} />
        <TestButton onClick={() => handleTestButtonClick(30)} value={30} testTemp={testTemp} />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">Clicks por Segundo (CPS)</h1>

        <p className="text-base leading-6 mb-4">Os <em className="font-semibold">"clicks por segundo"</em> (CPS) são uma métrica que mede a rapidez com que um usuário é capaz de realizar cliques em um dispositivo de entrada, como um mouse. Essa medida é frequentemente associada a jogos online, especialmente aqueles que exigem uma resposta rápida e precisa dos jogadores. O CPS tornou-se uma métrica de destaque em competições de jogos, onde a velocidade de clique pode influenciar diretamente o desempenho e o sucesso do jogador.</p>

        <p className="text-base leading-6 mb-4">O CPS é uma habilidade que pode ser aprimorada com a prática e o treinamento específico. Jogadores competitivos muitas vezes buscam aumentar sua taxa de CPS para ganhar vantagem sobre seus oponentes. Existem até mesmo programas e aplicativos projetados para ajudar os jogadores a aprimorar essa habilidade, oferecendo exercícios e desafios para melhorar a velocidade e a precisão dos cliques.</p>

        <p className="text-base leading-6 mb-4">Além do mundo dos jogos, o CPS também é relevante em outras áreas, como testes de usabilidade e pesquisa de mercado. Em ambientes de teste, a medição do CPS pode fornecer insights sobre a eficiência e a facilidade de uso de determinados interfaces ou dispositivos. Em pesquisas de mercado, o CPS pode ser considerado ao avaliar a preferência do consumidor por diferentes tipos de dispositivos de entrada.</p>

        <p className="text-base leading-6 mb-4">É importante notar que a ênfase no CPS não deve obscurecer outros aspectos cruciais de uma experiência de usuário ou habilidade em jogos. A precisão, a estratégia e o tempo de reação também desempenham papéis essenciais no desempenho global. O CPS é apenas uma peça do quebra-cabeça, e uma abordagem equilibrada é fundamental para alcançar o sucesso em diversas situações.</p>

        <p className="text-base leading-6 mb-4">Em última análise, enquanto o CPS pode ser uma métrica interessante e relevante em certos contextos, é vital considerar uma variedade de habilidades e fatores ao avaliar a eficácia de um usuário em determinada atividade. O equilíbrio entre velocidade, precisão e estratégia é a chave para o sucesso em muitos cenários, indo além da simples contagem de cliques por segundo.</p>
      </div>
    </main>
  );
}