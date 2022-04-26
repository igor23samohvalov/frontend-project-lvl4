import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Chatpage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.userId === undefined) {
      navigate('/login');
    }
  }, []);

  return (
    <div>This is a chatpage, or dare i say, a placeholder for it</div>
  );
}

export default Chatpage;
