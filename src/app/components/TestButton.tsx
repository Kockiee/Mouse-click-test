export default function TestButton({onClick, testTemp, value}: {onClick: () => void, testTemp:number, value:number}) {
    return (
        <button
        onClick={onClick}
        className={`border border-slate-700 p-2 hover:bg-slate-700 ${testTemp === value && 'bg-slate-700'}`}>
            {value}seg
        </button>
    )
}