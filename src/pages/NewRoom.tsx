import { useContext } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';

import { AuthContext } from '../App'

export function NewRoom() {
    const { user } = useContext(AuthContext);
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Simbol" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
            <div className="main-content">
                <img src={logoImg} alt="Letmeask" />
                <h1>{user?.name}</h1>
                <h2>Criar uma nova sala</h2>
                <form>
                    <input 
                    type="text"
                    placeholder="Nome da sala"
                    />
                    <Button type="submit">
                        Criar sala
                    </Button>
                </form>
                <p>
                 Quer entrar em uma sala existente? <a href="/">Clique aqui</a>
                </p>
            </div>
            </main>
        </div>
    );
}