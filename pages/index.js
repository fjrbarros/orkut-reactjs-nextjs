import React, { useState, useEffect } from 'react';
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className='boxLink' href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox({ title, items }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className='smallTitle'>
        {title} ({items.length})
      </h2>
      <ul>
        {
          items.map((item, index) => {
            const imageUrl = item.avatar_url ? item.avatar_url : item.image ? item.image : item.imageUrl;
            const title = item.login ? item.login : item.title;

            return (
              <li key={index}>
                <a href='#'>
                  <img src={imageUrl} />
                  <span>{title}</span>
                </a>
              </li>
            )
          })
        }
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const githubUser = 'fjrbarros';
  const [seguidores, setSeguidores] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const amigos = [{
    title: 'IVictorinoI',
    imageUrl: `https://github.com/IVictorinoI.png`
  }, {
    title: 'cataneomatheus',
    imageUrl: `https://github.com/cataneomatheus.png`
  }, {
    title: 'israelburigo',
    imageUrl: `https://github.com/israelburigo.png`
  }, {
    title: 'diego3g',
    imageUrl: `https://github.com/diego3g.png`
  }];

  useEffect(() => {
    fetch('https://api.github.com/users/fjrbarros/followers')
      .then(resp => {
        if (resp.ok) return resp.json();

        throw new Error('Erro durante a requisição ' + resp.status);
      })
      .then(respJson => setSeguidores(respJson))
      .catch(error => console.error(error));

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '18ee7965bd46ff3b211de7552edcb3',
        'Content-Type': 'aplication/json',
        'Accept': 'aplication/json'
      },
      body: JSON.stringify({
        'query': `query {
          allCommunities {
            id
            title
            image
          }
        }`})
    })
      .then(resp => resp.json())
      .then(respJson => setComunidades(respJson.data?.allCommunities))
      .catch(error => console.error('Erro duarante a requisição ' + error));
  }, [])


  function handleSubmit(event) {
    event.preventDefault();
    const dadosForm = new FormData(event.target);
    const novaComunidade = {
      title: dadosForm.get('title'),
      image: dadosForm.get('image')
    };

    fetch('/api/comunidades', {
      method: 'POST',
      headers: { 'Content-Type': 'aplication/json' },
      body: JSON.stringify(novaComunidade)
    })
      .then(async resp => {
        const dados = await resp.json();
        setComunidades([...comunidades, dados.registroCriado]);
        document.getElementById('formComunidade').reset();
      })
      .catch(error => console.error('Erro duarante a requisição ' + error));
  }

  return <>
    <AlurakutMenu githubUser={githubUser} />
    <MainGrid>
      <div className='profileArea' style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={githubUser} />
      </div>
      <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className='title'>
            Bem vindo(a)
          </h1>
          <OrkutNostalgicIconSet />
        </Box>
        <Box>
          <h2 className='subTitle'>O que você deseja fazer?</h2>
          <form onSubmit={handleSubmit} id='formComunidade'>
            <div>
              <input
                placeholder='Qual vai ser o nome da sua comunidade?'
                name='title'
                aria-label='Qual vai ser o nome da sua comunidade?'
              />
            </div>
            <div>
              <input
                placeholder='Coloque uma URL para usarmos de capa'
                name='image'
                aria-label='Coloque uma URL para usarmos de capa'
              />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBox title='Seguidores' items={seguidores} />
        <ProfileRelationsBox title='Comunidades' items={comunidades} />
        <ProfileRelationsBox title='Amigos' items={amigos} />
      </div>
    </MainGrid>
  </>;
}
