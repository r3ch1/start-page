interface links {
  icon: string;
  text: string;
  url: string;
}

const Links = () => {
  const links: links[] = [
    {
      icon: 'fa-regular fa-calendar-check',
      text: 'Ponto',
      url: 'https://oliveiratrust.softtrade.com.br/Relogio/login.xhtml',
    },
    {
      icon: 'fa-regular fa-calendar-days',
      text: 'Escala',
      url: 'https://docs.google.com/spreadsheets/d/12aidPLGpKF1FdCnIbXh7rodm-Qk-ANmBga_T9IzS0yE/edit?pli=1&gid=967383849#gid=967383849',
    },
    {
      icon: 'fa-regular fa-building',
      text: 'Portal RH',
      url: 'https://portalrholiveiratrust.cloudmetadados.com.br/PortalRH/Account/Login?ReturnUrl=%2fPortalRH%2fSolicitacoes',
    },
    {
      icon: 'fa-regular fa-circle-check',
      text: 'Click Compliance',
      url: 'https://oliveiratrust.clickcompliance.com/portal',
    },
    {
      icon: 'fab fa-jira',
      text: 'Jira',
      url: 'https://otjira.atlassian.net/jira/software/c/projects/SCF/boards/64?assignee=5f4e92c89a013100413bcb28',
    },
    {
      icon: 'fa-solid fa-file-invoice-dollar',
      text: 'Nota Fiscal',
      url: 'https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional',
    },
    { icon: 'fa-solid fa-retweet', text: 'Trocar Senha', url: 'http://senha/' },
    { icon: 'fa-solid fa-a', text: 'AExplorers', url: 'https://www.aexplorers.net ' },
    {
      icon: 'fa-regular fa-file-excel',
      text: 'Zombicide BP Chars',
      url: 'https://docs.google.com/spreadsheets/d/1C1RhEnbAiof8BLyfjYAW_lSuylr4Fa3rL3bPe5BaCug/htmlview',
    },
  ];
  return (
    <div className="row">
      <ul className="list-group list-group-horizontal">
        {links.map((link: any, i) => (
          <li key={`links-horizontal-${i}`}>
            <a href={link.url} className="text-small">
              <i className={`${link.icon} fa-4x`} />
              <span>{link.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Links;
