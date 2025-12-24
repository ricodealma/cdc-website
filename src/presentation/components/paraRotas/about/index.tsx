import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';

const AboutPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <AboutHero />
        <Comeco />
        <BaseTeologica />
        <Lideres />
        <Convite />
      </main>
    </div>
  );
};

const AboutHero = () => {
  return (
    <section className="w-full section-padding-y">
      <div className="container-responsive">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-fluid-6xl font-bold tracking-tighter">
              Nossa História
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-fluid-xl">
              Conheça a jornada, fundamentos e valores que nos guiam
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Comeco = () => {
  return (
    <section className="w-full section-padding-y bg-muted/50">
      <div className="container-responsive">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-fluid-4xl font-bold tracking-tighter">
              Nosso pequeno começo
            </h2>
            <p className="text-muted-foreground text-fluid-base">
              A Comunidade do Caminho foi fundada em janeiro de 2000, após um
              período de jejum e oração, com o propósito de seguir uma direção
              de Deus. Desde então, a igreja desenvolve ministérios, células e
              discipulado, sempre com o foco em ensinar princípios bíblicos por
              meio do exemplo de vida.
            </p>
            <p className="text-muted-foreground text-fluid-base">
              Ao longo dos anos, a comunidade cresceu e experimentou momentos
              marcantes na presença de Deus, como retiros, festas bíblicas e
              encontros. Ministérios como Intercessão, o infantil GNC e os
              grupos de dança Ruach e Ruach Kids se fortaleceram, contribuindo
              para o impacto na vida da comunidade. A história da igreja
              continua sendo marcada por fidelidade, milagres e parcerias,
              sempre sob o governo de Deus.
            </p>
          </div>
          <Image
            src="/humble-begining.jpg?height=400&width=600"
            width={600}
            height={400}
            alt="Historic photo of church founding"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};


const PRINCIPLES = [
  {
    title: '1. Deus',
    definition:
      'Deus é o Criador e Aquele que governa o universo. Ele existe eternamente em três pessoas: Pai, Filho e Espírito Santo. Estas três pessoas são co-iguais, sendo um só Deus.',
    bases: [
      {
        text: 'No princípio criou Deus os céus e a terra. (...) E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; domine ele sobre os peixes do mar; sobre as aves do céu, sobre os animais domésticos, e sobre toda a terra, e sobre todo réptil que se arrasta sobre a terra. Criou, pois, Deus o homem à sua imagem; à imagem de Deus o criou; homem e mulher os criou.',
        ref: '(Gênesis 1:1, 26-27)',
      },
      {
        text: 'Então disse o SENHOR Deus: Eis que o homem é como um de nós, sabendo o bem e o mal; ora, para que não estenda a sua mão, e tome também da árvore da vida, e coma e viva eternamente.',
        ref: '(Gênesis 3:22)',
      },
      {
        text: 'Antes que nascessem os montes, ou que tivesses formado a terra e o mundo, sim, de eternidade a eternidade tu és Deus.',
        ref: '(Salmos 90:2)',
      },
      {
        text: 'Portanto ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo.',
        ref: '(Mateus 28:19)',
      },
      {
        text: '(...) eleitos segundo a presciência de Deus Pai, na santificação do Espírito, para a obediência e aspersão do sangue de Jesus Cristo: Graça e paz vos sejam multiplicadas.',
        ref: '(I Pedro 1:2)',
      },
      {
        text: 'A graça do Senhor Jesus Cristo, e o amor de Deus, e a comunhão do Espírito Santo sejam com todos vós.',
        ref: '(II Coríntios 13:13)',
      },
    ],
  },
  {
    title: '2. Jesus Cristo',
    definition:
      'Jesus Cristo é o Filho de Deus, co-igual com o Pai. Viveu uma vida sem pecado e ofereceu-se como sacrifício perfeito pelos pecados de todos ao morrer na cruz. Ressuscitou ao terceiro dia, demonstrando poder sobre o pecado e a morte. Subiu aos céus e voltará para reinar como Rei dos reis e Senhor dos senhores.',
    bases: [
      {
        text: 'Ora, tudo isso aconteceu para que se cumprisse o que fora dito da parte do Senhor pelo profeta: Eis que a virgem conceberá e dará à luz um filho, o qual será chamado EMANUEL, que traduzido é: Deus conosco.',
        ref: '(Mateus 1:22-23)',
      },
      {
        text: 'Porque um menino nos nasceu, um filho se nos deu; e o governo estará sobre os seus ombros; e o seu nome será: Maravilhoso Conselheiro, Deus Forte, Pai Eterno, Príncipe da Paz.',
        ref: '(Isaías 9:6)',
      },
      {
        text: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus. (...) Todas as coisas foram feitas por intermédio dele (...). Nele estava a vida, e a vida era a luz dos homens (...).',
        ref: '(João 1:1-5)',
      },
      {
        text: 'Não crês tu que eu estou no Pai, e que o Pai está em mim? (...) Crede-me que eu estou no Pai, e que o Pai está em mim (...)',
        ref: '(João 14:10-30 - Resumo da passagem sobre a unidade com o Pai, o envio do Espírito Santo e a promessa de retorno)',
      },
      {
        text: 'Tendo, portanto, um grande sumo sacerdote, Jesus, Filho de Deus, que penetrou os céus (...). Porque não temos um sumo sacerdote que não possa compadecer-se das nossas fraquezas; porém um que, como nós, em tudo foi tentado, mas sem pecado.',
        ref: '(Hebreus 4:14-15)',
      },
      {
        text: 'Porque primeiramente vos entreguei o que também recebi: que Cristo morreu por nossos pecados, segundo as Escrituras; que foi sepultado; que foi ressuscitado ao terceiro dia, segundo as Escrituras.',
        ref: '(I Coríntios 15:3-4)',
      },
      {
        text: '(...) Acerca de seu Filho (...) com poder foi declarado Filho de Deus segundo o espírito de santidade, pela ressurreição dentre os mortos - Jesus Cristo nosso Senhor (...).',
        ref: '(Romanos 1:3-4)',
      },
      {
        text: 'Tendo ele dito estas coisas, foi levado para cima (...) Esse Jesus, que dentre vós foi elevado para o céu, há de vir assim como para o céu o vistes ir.',
        ref: '(Atos 1:9-11)',
      },
      {
        text: '(...) exorto-te a que guardes este mandamento sem mácula e irrepreensível até a vinda de nosso Senhor Jesus Cristo; a qual (...) manifestará o bem-aventurado e único soberano, Rei dos reis e Senhor dos senhores (...).',
        ref: '(I Timóteo 6:13-15)',
      },
      {
        text: '(...) aguardando a bem-aventurada esperança e o aparecimento da glória do nosso grande Deus e Salvador Cristo Jesus.',
        ref: '(Tito 2:13)',
      },
    ],
  },
  {
    title: '3. Espírito Santo',
    definition:
      'O Espírito Santo é co-igual com o Pai e o Filho. Está presente no mundo para conscientizar o homem da necessidade de Jesus Cristo. Vive em cada cristão desde a salvação, capacitando-o a testemunhar (especialmente após o Batismo no Espírito Santo), concedendo dons espirituais para servir a Igreja, e provendo poder, entendimento e direção para viver retamente. Devemos buscar viver sob Seu controle diariamente.',
    bases: [
      {
        text: 'Ora, o Senhor é o Espírito; e onde está o Espírito do Senhor aí há liberdade.',
        ref: '(II Coríntios 3:17)',
      },
      {
        text: 'Todavia, digo-vos a verdade, convém-vos que eu vá; pois se eu não for, o Ajudador não virá a vós (...). E quando ele vier, convencerá o mundo do pecado, da justiça e do juízo (...). Quando vier, porém, aquele, o Espírito da verdade, ele vos guiará a toda a verdade (...).',
        ref: '(João 16:7-13)',
      },
      {
        text: 'E eu rogarei ao Pai, e ele vos dará outro Ajudador, para que fique convosco para sempre, a saber, o Espírito da verdade , o qual o mundo não pode receber; porque não o vê nem o conhece; mas vós o conheceis, porque ele habita convosco, e estará em vós..',
        ref: '(João 14:16-17)',
      },
      {
        text: 'Estando com eles, ordenou-lhes que não se ausentassem de Jerusalém, mas que esperassem a promessa do Pai (...). Mas recebereis poder, ao descer sobre vós o Espírito Santo, e ser-me-eis testemunhas (...).',
        ref: '(Atos 1:4-8)',
      },
      {
        text: 'Ora, nós não temos recebido o espírito do mundo, mas sim o Espírito que provém de Deus, a fim de compreendermos as coisas que nos foram dadas gratuitamente por Deus (...)',
        ref: '(I Coríntios 2:12)',
      },
      {
        text: 'Não sabeis vós que sois santuário de Deus, e que o Espírito de Deus habita em vós?',
        ref: '(I Coríntios 3:16)',
      },
      {
        text: '(...) fostes selados com o Espírito Santo da promessa (...).',
        ref: '(Efésios 1:13)',
      },
      {
        text: 'Se vivemos pelo Espírito, andemos também pelo Espírito.',
        ref: '(Gálatas 5:25)',
      },
      {
        text: 'E não vos embriagueis com vinho, no qual há devassidão, mas enchei-vos do Espírito.',
        ref: '(Efésios 5:18)',
      },
    ],
  },
  {
    title: '4. A Bíblia',
    definition:
      'A Bíblia é a Palavra de Deus, escrita por homens inspirados e dirigidos pelo Espírito Santo. É a fonte suprema e infalível de verdade para a fé e vida cristã. É a verdade absoluta, o ponto final, e deve ser conhecida e praticada por todo cristão.',
    bases: [
      {
        text: 'Toda Escritura é divinamente inspirada e proveitosa para ensinar, para repreender, para corrigir, para instruir em justiça (...)',
        ref: '(II Timóteo 3:16)',
      },
      {
        text: '(...) nenhuma profecia da Escritura é de particular interpretação. Porque a profecia nunca foi produzida por vontade dos homens, mas os homens da parte de Deus falaram movidos pelo Espírito Santo.',
        ref: '(II Pedro 1:20-21)',
      },
      {
        text: 'Conserva o modelo das sãs palavras que de mim tens ouvido na fé e no amor que há em Cristo Jesus (...)',
        ref: '(II Timóteo 1:13)',
      },
      {
        text: 'Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.',
        ref: '(Salmos 119:105)',
      },
      {
        text: 'A soma da tua palavra é a verdade, e cada uma das tuas justas ordenanças dura para sempre.',
        ref: '(Salmos 119:160)',
      },
      {
        text: 'As palavras do Senhor são palavras puras, como prata refinada (...).',
        ref: '(Salmos 12:6)',
      },
      {
        text: 'Toda palavra de Deus é pura; ele é um escudo para os que nele confiam.',
        ref: '(Provérbios 30:5)',
      },
      {
        text: 'E sede cumpridores da palavra e não somente ouvintes (...).',
        ref: '(Tiago 1:22)',
      },
    ],
  },
  {
    title: '5. O Ser Humano',
    definition:
      'O homem foi criado à imagem espiritual de Deus, para ser como Ele em caráter, sendo o objeto supremo da criação. Contudo, devido ao pecado (uma atitude de desobediência), todos estão marcados e separados de Deus, o que causa muitos problemas.',
    bases: [
      {
        text: 'Criou, pois, Deus o homem à sua imagem; à imagem de Deus o criou; homem e mulher os criou.',
        ref: '(Gênesis 1:27)',
      },
      {
        text: 'Quando contemplo os teus céus (...) que é o homem, para que te lembres dele? (...) Contudo, pouco abaixo de Deus o fizeste; de glória e de honra o coroaste. Deste-lhe domínio sobre as obras das tuas mãos (...).',
        ref: '(Salmos 8:3-6)',
      },
      {
        text: 'Todos nós andávamos desgarrados como ovelhas, cada um se desviava pelo seu caminho (...).',
        ref: '(Isaías 53:6a)',
      },
      {
        text: 'Porque todos pecaram e destituídos estão da glória de Deus.',
        ref: '(Romanos 3:23)',
      },
      {
        text: '(...) as vossas iniquidades fazem separação entre vós e o vosso Deus; e os vossos pecados esconderam o seu rosto de vós (...).',
        ref: '(Isaías 59:1-2)',
      },
    ],
  },
  {
    title: '6. Salvação',
    definition:
      'A Salvação é um presente gratuito de Deus, que deve ser aceito. Não pode ser alcançada por esforço pessoal ou boas obras. Ocorre unicamente pela fé em Jesus Cristo como oferta de Deus para o perdão dos pecados. A vida eterna começa no momento em que se recebe Jesus como Senhor e Salvador.',
    bases: [
      {
        text: 'Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus nosso Senhor.',
        ref: '(Romanos 6:23)',
      },
      {
        text: 'Porque pela graça sois salvos, por meio da fé, e isto não vem de vós, é dom de Deus; não vem das obras, para que ninguém se glorie.',
        ref: '(Efésios 2:8-9)',
      },
      {
        text: 'Respondeu-lhe Jesus: Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai, senão por mim.',
        ref: '(João 14:6)',
      },
      {
        text: 'Mas, a todos quantos o receberam, aos que crêem no seu nome, deu-lhes o poder de se tornarem filhos de Deus.',
        ref: '(João 1:12)',
      },
      {
        text: '(...) não em virtude de obras de justiça que nós houvéssemos feito, mas segundo a sua misericórdia, nos salvou mediante o lavar da regeneração e renovação pelo Espírito Santo.',
        ref: '(Tito 3:5)',
      },
      {
        text: 'Justificados, pois, pela fé, tenhamos paz com Deus, por nosso Senhor Jesus Cristo.',
        ref: '(Romanos 5:1)',
      },
      {
        text: 'Pois todos sois filhos de Deus pela fé em Cristo Jesus.',
        ref: '(Gálatas 3:26)',
      },
    ],
  },
  {
    title: '7. Segurança Eterna',
    definition:
      'A vida eterna, dada por Deus através de Jesus Cristo, garante a segurança da salvação para o verdadeiro cristão por toda a eternidade. A evidência da salvação genuína são os frutos da caminhada com Cristo e a perseverança na Palavra e nos mandamentos até o fim. A salvação é mantida pela graça e poder de Deus, não pelo esforço humano.',
    bases: [
      {
        text: 'Mas quem perseverar até o fim, esse será salvo.',
        ref: '(Mateus 24:13)',
      },
      {
        text: 'Meu Pai, que mas deu, é maior do que todos; e ninguém pode arrebatá-las da mão de meu Pai.',
        ref: '(João 10:29)',
      },
      {
        text: 'Por esta razão sofro também estas coisas, mas não me envergonho; porque eu sei em quem tenho crido, e estou certo de que ele é poderoso para guardar o meu depósito até aquele dia.',
        ref: '(II Timóteo 1:12)',
      },
      {
        text: 'Portanto, pode também salvar perfeitamente os que por ele se chegam a Deus, porquanto vive sempre para interceder por eles.',
        ref: '(Hebreus 7:25)',
      },
      {
        text: 'É nessa vontade dele que temos sido santificados pela oferta do corpo de Jesus Cristo, feita uma vez para sempre. (...) Pois com uma só oferta tem aperfeiçoado para sempre os que estão sendo santificados.',
        ref: '(Hebreus 10:10, 14)',
      },
      {
        text: 'Bendito seja o Deus e Pai (...) que (...) nos regenerou para uma viva esperança (...) para uma herança incorruptível (...) reservada nos céus para vós, que pelo poder de Deus sois guardados, mediante a fé, para a salvação (...).',
        ref: '(I Pedro 1:3-5)',
      },
    ],
  },
  {
    title: '8. Eternidade',
    definition:
      'O ser humano foi criado para existir eternamente, seja com Deus (Céu) através do perdão e salvação, seja separado de Deus (Inferno) pelo pecado. Céu e Inferno são lugares reais de existência eterna.',
    bases: [
      {
        text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
        ref: '(João 3:16)',
      },
      {
        text: 'Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus nosso Senhor.',
        ref: '(Romanos 6:23)',
      },
      {
        text: '(...) e, se filhos, também herdeiros, herdeiros de Deus e co-herdeiros de Cristo (...) as aflições deste tempo presente não se podem comparar com a glória que em nós há de ser revelada.',
        ref: '(Romanos 8:17-18)',
      },
      {
        text: '(...) todo aquele que não foi achado inscrito no livro da vida, foi lançado no lago de fogo.',
        ref: '(Apocalipse 20:15)',
      },
      {
        text: 'Mas, como está escrito: As coisas que olhos não viram, nem ouvidos ouviram, nem penetraram o coração do homem, são as que Deus preparou para os que o amam.',
        ref: '(I Coríntios 2:9 - Contexto de I Co 2:7-9)',
      },
    ],
  },
];

const BaseTeologica = () => {
  return (
    <section className="w-full section-padding-y">
      <div className="container-responsive">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-fluid-4xl font-bold tracking-tighter">
              Nossa Base Teológica
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-fluid-xl">
              Estamos fundamentados na fé cristã histórica, afirmando a
              autoridade das Escrituras e a centralidade de Jesus Cristo.
            </p>
          </div>

          <div className="mx-auto w-full max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              {PRINCIPLES.map((principle, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {principle.title}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 p-4 text-base text-muted-foreground bg-muted/20 rounded-b-lg">
                    <p className="font-medium text-foreground">
                      {principle.definition}
                    </p>
                    {principle.bases.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                          Base Bíblica:
                        </p>
                        <ul className="space-y-3 list-none">
                          {principle.bases.map((base, idx) => (
                            <li
                              key={idx}
                              className="bg-background p-3 rounded-md border border-border/50 text-sm italic"
                            >
                              <span className="block mb-1">
                                "{base.text.replace(/^"|"$/g, '')}"
                              </span>
                              <span className="block text-xs font-semibold not-italic text-primary text-right">
                                {base.ref}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

const Lideres = () => {
  return (
    <section className="w-full section-padding-y bg-muted/50">
      <div className="container-responsive">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-fluid-4xl font-bold tracking-tighter">
              Nossa Liderança
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-fluid-xl">
              Conheça aqueles que o senhor chamou para cumprir a obra em nosso
              meio
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-8">
            {[
              {
                name: 'Adenilson Santos',
                role: 'Pastor presidente',
                image: '/placeholder.svg?height=300&width=300',
              },
              {
                name: 'Guilhermano Júnior',
                role: 'Presbítero',
                image: '/placeholder.svg?height=300&width=300',
              },
              {
                name: 'Daniel Ferraz',
                role: 'Presbítero',
                image: '/placeholder.svg?height=300&width=300',
              },
              {
                name: 'Simone Marques',
                role: 'Pastora e lider de intercessão',
                image: '/placeholder.svg?height=300&width=300',
              },
              {
                name: 'Andreia Santos',
                role: 'Pastora',
                image: '/placeholder.svg?height=300&width=300',
              },
              {
                name: 'Meire Márcia',
                role: 'Líder do Ministério Infantil',
                image: '/placeholder.svg?height=300&width=300',
              },
              {
                name: 'Luciana Maia',
                role: 'Líder do Ministério de mulheres',
                image: '/placeholder.svg?height=300&width=300',
              },
              {
                name: 'Fabiane Ferraz',
                role: 'Líder do Ministério de Evangelismo',
                image: '/placeholder.svg?height=300&width=300',
              },
              {
                name: 'Weldson Batista',
                role: 'Líder do Ministério de Mídia',
                image: '/placeholder.svg?height=300&width=300',
              },
            ].map((leader, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2"
              >
                <Image
                  src={leader.image || '/placeholder.svg'}
                  width={150}
                  height={150}
                  alt={leader.name}
                  className="rounded-full object-cover h-32 w-32"
                />
                <h3 className="text-xl font-bold">{leader.name}</h3>
                <p className="text-sm text-muted-foreground">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Convite = () => {
  return (
    <section className="w-full section-padding-y">
      <div className="container-responsive">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-fluid-4xl font-bold tracking-tighter">
              Faça parte da família
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-fluid-xl">
              vamos amar receber você em nossa família
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/#calendar"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Agenda
            </Link>
            <Link
              href="/#contact"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Entre em contato
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;