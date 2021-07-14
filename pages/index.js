import React, { useState } from 'react';
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

export default function Home() {
  const githubUser = 'fjrbarros';
  const amigos = ['IVictorinoI', 'cataneomatheus', 'israelburigo', 'diego3g'];
  const [comunidades, setComunidades] = useState([{
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);


  function handleSubmit(event) {
    event.preventDefault();
    const dadosForm = new FormData(event.target);
    const comunidade = {
      title: dadosForm.get('title'),
      image: dadosForm.get('image')
    };
    setComunidades([...comunidades, comunidade]);
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
          <form onSubmit={handleSubmit}>
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
        <ProfileRelationsBoxWrapper>
          <h2 className='smallTitle'>
            Comunidades ({comunidades.length})
          </h2>
          <ul>
            {
              comunidades.map((item, index) => {
                return (
                  <li key={index}>
                    <a href={`/users/${item}`} key={item}>
                      <img src={item.image} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className='smallTitle'>
            Amigos ({amigos.length})
          </h2>
          <ul>
            {
              amigos.map(item => {
                return (
                  <li key={item}>
                    <a href={`/users/${item}`}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
  </>;
}
