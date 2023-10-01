import devicons from '../../../../devicon.json';

const availableLanguages = [
  { name: 'JavaScript', value: 'javascript' },
  { name: 'Python', value: 'python' },
  { name: 'Rust', value: 'rust' },
  { name: 'Java', value: 'java' },
  { name: 'C++', value: 'cplusplus' },
  { name: 'Ruby', value: 'ruby' },
  { name: 'C#', value: 'csharp' },
  { name: 'Swift', value: 'swift' },
  { name: 'Go', value: 'go' },
  { name: 'PHP', value: 'php' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'Kotlin', value: 'kotlin' },
  { name: 'Dart', value: 'dart' },
  { name: 'Perl', value: 'perl' },
  { name: 'Scala', value: 'scala' },
  { name: 'R', value: 'r' },
  { name: 'Objective-C', value: 'objectivec' },
  { name: 'Haskell', value: 'haskell' },
  { name: 'Lua', value: 'lua' },
  { name: 'Matlab', value: 'matlab' },
  { name: 'Groovy', value: 'groovy' },
  { name: 'HTML5', value: 'html5' },
  { name: 'CSS3', value: 'css3' },
  { name: 'Bash', value: 'bash' },
  { name: 'MySQL', value: 'mysql' },
  { name: 'Elixir', value: 'elixir' },
  { name: 'Erlang', value: 'erlang' },
  { name: 'OCaml', value: 'ocaml' },
  { name: 'Haxe', value: 'haxe' },
  { name: 'Julia', value: 'julia' },
];

const webDevelopmentFrameworks = [
  { name: 'React', value: 'react' },
  { name: 'Angular', value: 'angularjs' },
  { name: 'Vue.js', value: 'vuejs' },
  { name: 'Ember.js', value: 'emberjs' },
  { name: 'Backbone.js', value: 'backbonejs' },
  { name: 'Django', value: 'django' },
  { name: 'Flask', value: 'flask' },
  { name: 'Pyramid', value: 'pyramid' },
  { name: 'FastAPI', value: 'fastapi' },
  { name: 'Tornado', value: 'tornado' },
  { name: 'Sinatra', value: 'sinatra' },
  { name: 'Hanami', value: 'hanami' },
  { name: 'Padrino', value: 'padrino' },
  { name: 'Spring Boot', value: 'springboot' },
  { name: 'JavaServer Faces (JSF)', value: 'jsf' },
  { name: 'Grails', value: 'grails' },
  { name: 'Play Framework', value: 'playframework' },
  { name: 'Express.js', value: 'express' },
  { name: 'Meteor', value: 'meteor' },
  { name: 'Next.js', value: 'nextjs' },
  { name: 'Nuxt.js', value: 'nuxtjs' },
  { name: 'Ruby on Rails', value: 'rails' },
  { name: 'Laravel', value: 'laravel' },
  { name: 'Symfony', value: 'symfony' },
  { name: 'ASP.NET', value: 'aspnet' },
  { name: '.NET Core', value: 'dotnetcore' },
  { name: 'Spring Framework', value: 'springframework' },
];

const frameworks = devicons.filter((frameworks) =>
  frameworks.tags.includes('framework')
);

const structureFrameworks = frameworks.map((framework) => {
  return {
    name: framework.name.toUpperCase(),
    value: framework.name,
  };
});

const versionControls = devicons.filter((vc) =>
  vc.tags.includes('version-control')
);

const structureVersionControls = versionControls.map((vc) => {
  return {
    name: vc.name.toUpperCase(),
    value: vc.name,
  };
});

const database = devicons.filter((db) => db.tags.includes('database'));

const structureDatabase = database.map((db) => {
  return {
    name: db.name.toUpperCase(),
    value: db.name,
  };
});

const testers = devicons.filter((testing) => testing.tags.includes('testing'));

const structureTesters = testers.map((testing) => {
  return {
    name: testing.name.toUpperCase(),
    value: testing.name,
  };
});

const library = devicons.filter((lib) => lib.tags.includes('library'));

const structureLibrary = library.map((lib) => {
  return {
    name: lib.name.toUpperCase(),
    value: lib.name,
  };
});

export const initialAboutMe = {
  id: '',
  user_id: '',
  content: '',
  hashnode_url: '',
  hackernoon_url: '',
  medium_url: '',
  freecodecamp_url: '',
  velog_url: '',
  devto_url: '',
  x_url: '',
  youtube_url: '',
  facebook_url: '',
  instagram_url: '',
  linkedin_url: '',
  web_framework: '',
  db: '',
  version_control: '',
  lang: '',
  testing: '',
  library: '',
  github_username: '',
  profile_url: '',
  profile_url_id: '',
  full_name: '',
  email: '',
  show_github_graph: false,
};




export const developerToolsAndTech = [
  {
    title: 'Programming Languages',
    toolType: 'lang',
    developerTools: availableLanguages,
  },
  {
    title: 'Web Development Frameworks',
    toolType: 'web_framework',
    developerTools: structureFrameworks,
  },
  {
    title: 'Version Control',
    toolType: 'version_control',
    developerTools: structureVersionControls,
  },
  {
    title: 'Database',
    toolType: 'db',
    developerTools: structureDatabase,
  },
  {
    title: 'Testing',
    toolType: 'testing',
    developerTools: structureTesters,
  },
  {
    title: 'Library',
    toolType: 'library',
    developerTools: structureLibrary,
  },
];
