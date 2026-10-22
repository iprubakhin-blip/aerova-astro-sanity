import {useState} from 'react';
export default function SavingsSimulator() {
  const [usage, setUsage] = useState(450);
  const [optimisation, setOptimisation] = useState(12);
  const annualSavings = Math.round(usage * 12 * (optimisation / 100));
  const formatted = new Intl.NumberFormat('en-US');
  return <div className="simulator" aria-label="Interactive scenario explorer">
    <div className="simulator-header"><span className="eyebrow small">INTERACTIVE EXAMPLE</span><span className="simulator-pill"><i/> Scenario model</span></div>
    <h3>What could efficiency unlock?</h3>
    <p>Explore a simple energy scenario. Adjust the assumptions and see how the numbers change.</p>
    <div className="range-control"><div className="range-label"><label htmlFor="usage">Monthly energy use</label><strong>{usage} MWh</strong></div><input id="usage" type="range" min="100" max="1000" step="10" value={usage} onChange={e=>setUsage(Number(e.target.value))}/><div className="range-ends"><span>100 MWh</span><span>1,000 MWh</span></div></div>
    <div className="range-control"><div className="range-label"><label htmlFor="reduction">Scenario reduction</label><strong>{optimisation}%</strong></div><input id="reduction" type="range" min="2" max="30" step="1" value={optimisation} onChange={e=>setOptimisation(Number(e.target.value))}/><div className="range-ends"><span>2%</span><span>30%</span></div></div>
    <div className="simulator-result"><span>Illustrative annual energy reduction</span><div><strong className="tabular-nums" aria-live="polite">{formatted.format(annualSavings)}</strong><span>MWh / year</span></div><p>For demonstration only. This is not a prediction, savings guarantee, or energy audit.</p></div>
  </div>;
}
