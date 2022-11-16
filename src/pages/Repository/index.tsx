import React, { useEffect, useState } from 'react';
import logoGithub from '../../assets/logo-github.svg';
import api from '../../services/api';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Header, RepositoryInfo, Issues, ContributorsList } from './styles';

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  user: {
    login: string;
  };
}

interface Contributors {
  login: string;
  avatar_url: string;
  url: string;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [contributors, setContributors] = useState<Contributors[]>([]);

  const params = useParams();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    void api.get(`repos/${params.repository}/${params.repo}`).then(response => {
      setRepository(response.data);
    });
    void api
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .get(`repos/${params.repository}/${params.repo}/issues`)
      .then(response => {
        setIssues(response.data);
      });
    void api
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .get(`/repos/${params.repository}/${params.repo}/contributors`)
      .then(response => {
        setContributors(response.data);
      });
  }, [params.repo, params.repository]);

  return (
    <>
      <Header>
        <img src={logoGithub} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      <RepositoryInfo>
        <header>
          <img
            src={repository?.owner.avatar_url}
            alt={repository?.owner.login}
          />
          <div>
            <strong>{repository?.full_name}</strong>
            <p>{repository?.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository?.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>{repository?.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository?.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>
      <ContributorsList>
        <header>
          <strong>Colaboradores</strong>
        </header>
        {contributors.map(contributors => (
          <a
            key={contributors.login}
            href={`https://github.com/${contributors.login}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={contributors.avatar_url} alt={contributors.login} />
          </a>
        ))}
      </ContributorsList>
      <Issues>
        {issues.map(issue => (
          <Link key={issue.id} to="asdasdas">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20}></FiChevronRight>
          </Link>
        ))}
      </Issues>
    </>
  );
};
export default Repository;
