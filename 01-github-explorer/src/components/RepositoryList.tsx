import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss';
import { useState, useEffect } from "react";

// useEffect dispara algo quandoa alguma coisa acontecer na aplicação, uma 
// variável mudou por exemplo

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList(){
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(()=>{
    fetch('https://api.github.com/orgs/rocketseat/repos')
    .then(response => response.json())
    .then(data => setRepositories(data))
  },[repositories])

  return(
    <section className="repository-List">
      <h1>Lista de Repositórios</h1>
      <ul>
        {repositories.map(repository => <RepositoryItem key={repository.name} repository={repository}/>)}
        
      </ul>
    </section>
  )
}
