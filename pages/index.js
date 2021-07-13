import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  );
}

export default function Home() {
  const githubUser = 'fjrbarros';
  const amigos = ['IVictorinoI', 'cataneomatheus', 'israelburigo', 'diego3g'];

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
      </div>
      <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
          <h2 className='smallTitle'>
            Amigos ({amigos.length})
          </h2>
          <ul>
            {
              amigos.map(item => {
                return (
                  <li>
                    <a href={`/users/${item}`} key={item}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </ProfileRelationsBoxWrapper>
        <Box>
          <h2 className='smallTitle'>
            Comunidade
          </h2>
        </Box>
      </div>
    </MainGrid>
  </>;
}
