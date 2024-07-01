import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get("/movie/now_playing", {
          params: {
            api_key: "af52bcc129c27f7db1cd1fd3b8fee484",
            language: "pt-BR",
            page: 1,
          }
        });

        // Verifica se a resposta foi bem-sucedida antes de atualizar o estado
        if (response.status === 200) {
          setFilmes(response.data.results.slice(0, 10))
          setLoading(false);
        } else {
          console.error("Falha ao buscar dados:", response.status);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    loadFilmes();
  }, []); // Lista de dependências vazia para executar apenas uma vez

  if(loading){
    return(
      <div className="loading">
        <h2>Carregando Filmes...</h2>
      </div>
    )
  }


  return (
    <div className="container">
      <div className="lista-filmes">
        BEM VINDO A HOME
        {filmes.map((filme) => (
          <article key={filme?.id}>
            <strong>{filme?.title}</strong>
            {/* Corrige interpolação da URL da imagem */}
            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme?.title} />
            <Link to={`/filme/${filme?.id}`} >Acessar</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;
