import React,{useState,useEffect} from 'react';
import {useRouteMatch,Link} from 'react-router-dom';
import {FiChevronRight,FiChevronsLeft} from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import {Header, RepositoryInfo, Issues} from './styles';

interface Repositorio{
    repository: string;
}

interface RepositoryData{
    full_name: string;
    owner:{
        avatar_url: string;
        login: string;
    };
    description:string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    user: {
      login: string;
    };
  }

const Repository: React.FC = () => {
    
    const [respository, setRepository] = useState<RepositoryData | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    const {params} = useRouteMatch<Repositorio>();

    useEffect(()=>{

          api.get(`repos/${params.repository}`).then( response => {
            setRepository(response.data) ;
          }); 

          api.get(`repos/${params.repository}/issues`).then( response => {
            setIssues(response.data) ;
          }); 

    },[params.repository]);

    return (
            <>
                <Header>
                    <img src={logoImg} alt="GitHub" />
                    <Link to="/">
                        <FiChevronsLeft size="20" />
                        Voltar
                    </Link>
                </Header>

                {   respository && (
                            <RepositoryInfo>
                            <header>
                                <img src={respository.owner.avatar_url} alt={respository.owner.login} />
                                <div>
                                    <strong>{respository.full_name}</strong>
                                    <p>{respository.full_name}</p>
                                </div>   
                            </header>
                            <ul>
                                <li>
                                    <strong>{respository.stargazers_count}</strong>
                                    <span>Stars</span>
                                </li>
                                <li>
                                    <strong>{respository.forks_count}</strong>
                                    <span>Forks</span>
                                </li>
                                <li>
                                    <strong>{respository.open_issues_count}</strong>
                                    <span>Issues abertas</span>
                                </li>
                            </ul>
                        </RepositoryInfo>
                    )
                } 

                <Issues>
                { issues.map( issue => (
                            
                            <a href={issue.html_url} target="_blank" key={issue.id}>
                                    
                                    <div>
                                        <strong>{issue.title}</strong>
                                        <p>{issue.user.login}</p>
                                    </div>

                                <FiChevronRight size={35} />
                            </a>
                            
                        )
                    )
                }
                </Issues>
            </>
    );

};

export default Repository;