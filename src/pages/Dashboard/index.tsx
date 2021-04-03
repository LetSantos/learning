import React,{useState, FormEvent, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FiChevronRight} from 'react-icons/fi';
import api from '../../services/api';

import logoGit from '../../assets/logo.svg';

import {Title, Form, Error, Repositories } from './styles';

interface Repository{
    full_name: string;
    owner:{
        avatar_url: string;
        login: string;
    };
    description:string;
}

const Dashboard: React.FC = () => {

    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories,setRepositories] = useState<Repository[]>( ()  => {
            
        const repositoriesData = localStorage.getItem('@GithubExplorer:repositories');
       
        if(repositoriesData)
            return JSON.parse(repositoriesData);
        else
            return [] ;

    });


    useEffect(() => {

        localStorage.setItem('@GithubExplorer:repositories',JSON.stringify(repositories));

    },[repositories]);

    async function handleAddReposiotry(event: FormEvent<HTMLFormElement>): Promise<void> {
        
        event.preventDefault();

        if(!newRepo)
        {
            setInputError('Informe o autor/nome do repositório.');
            return;
        }

        try
        {
            const response = await api.get<Repository>(`repos/${newRepo}`);

            const repository = response.data;
    
            setRepositories([... repositories, repository]);
    
            setNewRepo('');
            setInputError('');

        }
        catch(e)
        {
            setInputError('Repositório não encontrado.');
        }
        

    } 

    return ( 
        <>
            <img src={logoGit} alt="Git Explorer" />
            <Title>Explore o repositório GIT</Title>
            <Form hasError={!!inputError} onSubmit={handleAddReposiotry}>
                <input placeholder="Digite o nome do repositório" value={newRepo} onChange={(e) => setNewRepo(e.target.value)} />
                <button type="submit">Pesquisar</button>
            </Form>

            { inputError && <Error>{inputError}</Error> }

            <Repositories>
                { repositories.map(repository => ( <Link to={`repository/${repository.full_name}`} key={repository.full_name}>
                            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                            <div>
                                <strong>{repository.full_name}</strong>
                                <p>{repository.description}</p>
                            </div>

                            <FiChevronRight size={35} />
                            </Link> ) 
                    )
                }                
            </Repositories>
        </>
         )

};

export default Dashboard;