import { useHistory } from 'react-router-dom';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { firebaseDatabase } from '../services/firebase';
import { FormEvent, useState } from 'react';

export function Home() {
  const history = useHistory();
  const {user, signInwithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
        if (!user) {
           await signInwithGoogle()
        }
      
        history.push('/rooms/new');    

}

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await firebaseDatabase.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
        alert(`A sala ${roomCode} não existe.`);
        return;
    }

    history.push(`/rooms/${roomCode}`);
  }
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
                <button onClick={handleCreateRoom} className="create-room">
                    <img src={googleIconImg} alt="Google" />
                    Crie sua sala com o Google
                </button>
                <div className="separator">ou entre em uma sala</div>
                <form onSubmit={handleJoinRoom}>
                    <input 
                    type="text"
                    placeholder="Digite o código da sala"
                    onChange={event => setRoomCode(event.target.value)}
                    value={roomCode}
                    />
                    <Button type="submit">
                        Entrar na sala
                    </Button>
                </form>
            </div>
            </main>
        </div>
    );
}