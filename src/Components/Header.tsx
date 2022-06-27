import { Logo } from "./Logo";
import { useState } from 'react';


export function Header() {

    const [active, setMode] = useState(false);
    const ToggleMode = () => {
        setMode(!active)
    }


    return (
        <header className="w-full py-5 flex items-center justify-between bg-gray-700 border-b border-gray-600">
            <Logo />
            <div className={active ? 'icon iconActive' : 'icon'} onClick={ToggleMode}>
                <div className='hamburguer hamburguerIcon'></div>
            </div>

            <div className={active ? 'menu menuOpen' : "menu menuClose"}>
                <div className='list'>
                    <ul className='listIems'>
                        <li>ola</li>
                        <li>mundo</li>
                        <li>deu </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}