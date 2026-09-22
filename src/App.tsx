import './App.css';
import EmojiFinder from './components/EmojiFinder';

export default function App() {
  return (
    <>
      <header className="header">
        <h1>Emoji Finder</h1>
        <p>Find emoji by keywords</p>
      </header>

      <EmojiFinder />
    </>
  );
}