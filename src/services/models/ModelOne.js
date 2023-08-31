import Format from "../FormatString";

export default function ModelOne(data) {
  const htmlBase = `
    <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      width: 210mm;
      height: 297mm;
      margin: 0 auto;
      padding: 20mm;
      font-family: Calibri, sans-serif;
    }

    h1 {
      text-align: center;
      font-weight: bold;
      margin-bottom: 40px;
    }

    h2 {
      font-weight: bold;
    }

    h3 {
      margin: 0;
    }

    h4 {
      font-weight:normal;
      font-size:16px;
      margin-bottom: 0;
      margin-top: 5px;
    }
    p {
      margin: 0;
      font-size: 16px;
      font-weight: normal;
    }
    li h4 {
      
      margin-bottom: 5px;
    }

 
    .subtitle {
      border-bottom: 1px solid black; 
      padding-bottom: 3px; 
    }
  </style>
</head>
<body>

`;
  console.log(57, data.personaldata);
  const age = Format.formatAge(data.personaldata.birthDate);
  const date = Format.formatDate(data.personaldata.birthDate);
  console.log(age, date);
  const htmlDataPersonal = `
</div>
  <h1>${data.personaldata.name}</h1>
    <h2 class="subtitle">DADOS PESSOAIS</h2>
      <h4>Idade: ${age} (${date}</h4>
      <h4>Cidade: ${data.personaldata.city}</h4>
      <h4>Telefone:${data.personaldata.phone} | ${data.personaldata.phoneSecundary}</h4>
      <h4>E-mail: ${data.personaldata.email}</h4>
      <h4>LinkedIn: www.linkedin.com/in/jarde-felicio-5b0906209</h4>
      <h4>GitHub: https://github.com/jardefelicio</h4>
      <h4>CNH: AB</h4>
      
      `;

  const htmlObjective = `
    <h2 class="subtitle">OBJETIVO</h2>    
      <h4>${data.objective}</h4> 
      `;

  const htmlQualificationSummary = `
    <h2 class="subtitle">RESUMO DE QUALIFICAÇÕES</h2>    
      <p>${data.qualificationsSummary}</p> 
        `;

  const htmlEducationalBackground = `       
  <!-- formação educacional -->
    <h2 class="subtitle">FORMAÇÃO EDUCACIONAL</h2>    
        <ul>
          <li>
            <h3>Graduação, Análise e Desenvolvimento de Sistemas (2021)</h3>
            <h4>Estácio SA</h4>
          </li>
        </ul>
        `;

  const htmlProfessionalExperience = `     
  <!-- Experiencia profissional -->
    <h2 class="subtitle">EXPERIÊNCIA PROFISSIONAL</h2>    
        <ul>
          <li>
            <h3>Infarma Sistemas, Fortaleza - CE (Nov, 2021 - Emprego Atual)</h3>
            <h4 style="font-weight: bold;">Analista de Suporte</h4>
            </p>
              Suporte ao sistema Infarma Varejo.<br>
              Ferramentas de atendimento Movidesk, WhatsTicket e Voiqx.<br>
              Suporte técnico a erros do sistema, instalação e atualização.<br>
              Configuração e instalação de periféricos, MFE, impressora, PIN PAD, Terminal de consulta.<br>
              Configuração de SITEF.<br>
              Rotinas fiscais, geração de arquivos Fortes, Sped, XML e etc.<br>
              Geração de arquivos SNGPC.<br>
              Banco de dados PostgreSQL, instalação , configuração e manutenção.<br>
              Banco de dados MS SQL Server;<br>     
              Backup, restore, procedimentos de recuperação de banco de dados, criação de JOB’s,<br>
              elaboração de scripts para correção de falhas e demandas.<br>
              Testes funcionais, análises com SQL Server Profiler, criação de JIRA.</p>
          </li>
        </ul>

        `;

  const htmlCourses = `     
  <!-- cursos -->
    <h2 class="subtitle">CURSOS EXTRACURRICULARES</h2>    
    <ul>
      <li>
        <h3>Node JS do Zero a Maestria (Jan, 2023) - Concluído</h3>
        <h4>Instituição: Udemy</h4>
      </li>
      <li>
        <h3>Node JS do Zero a Maestria (Jan, 2023) - Concluído</h3>
        <h4>Instituição: Udemy</h4>
      </li>
      <li>
        <h3>Node JS do Zero a Maestria (Jan, 2023) - Concluído</h3>
        <h4>Instituição: Udemy</h4>
      </li>
    </ul>

    `;

  const htmlLanguages = `     
  <!-- idiomas -->
    <h2 class="subtitle">IDIOMAS</h2>    
    <ul>
      <li>
        <h3>Inglês</h3>
        <h4>Avançado</h4>
      </li>
      <li>
        <h3>Espanhol</h3>
        <h4>Básico</h4>
      </li>
    </ul>
  </div>
</body>
</html>
`;

  const fullHTML =
    htmlBase +
    htmlDataPersonal +
    htmlObjective +
    htmlQualificationSummary +
    htmlEducationalBackground +
    htmlProfessionalExperience +
    htmlCourses +
    htmlLanguages;

  return fullHTML;
}
