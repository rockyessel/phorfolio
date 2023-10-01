import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next';
import { ArticleItem, CommentProps, ProjectItem } from '@/interface';
import { findUserByUsername, getAllUserArticlesSlugs, getAllUsername, getAllUsersProjectsSlugs } from '@/utils/outerbase-req/users';
import { useRouter } from 'next/router';
import ArticleDetailedPage from '@/template/articles/[article]';
import { getArticleBySlug } from '@/utils/outerbase-req/articles';
import { getFormatCommentsAndReplies } from '@/utils/outerbase-req/comment';
import ProjectDetailedPage from '@/template/projects/[project]';
import { getProjectBySlug } from '@/utils/outerbase-req/projects';

export default function DetailedPage(props: InferGetServerSidePropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }



  switch (props.pages) {
    case 'articles':
      return <ArticleDetailedPage article={props.article} comments={props.articleComments} />
    
    case 'projects':  
      return <ProjectDetailedPage project={props.project} comments={props.projectComments} />
  
    default:
      break;
  }

}


export const getStaticPaths: GetStaticPaths = async () => {
  const subdomains = await getAllUsername(); 

  const paths =  await Promise.all(subdomains.flatMap(async (subdomain)=> {
  const user = await findUserByUsername(subdomain.username)
    if (user) {
    const usersArticleSlugs = await getAllUserArticlesSlugs(user.id);
    const usersProjectsSlug = await getAllUsersProjectsSlugs(user.id)
    const userArticlePath = usersArticleSlugs.map((slug)=> ({ params: {subdomain:subdomain.username, pages: 'articles', slug: slug.slug}}))
    const usersProjectPath = usersProjectsSlug.map((slug)=> ({ params: {subdomain:subdomain.username, pages: 'projects', slug: slug.slug}}))
       return [...userArticlePath, ...usersProjectPath]
    }
    return []
  }))

  console.log('paths: ',paths)
  return {
    paths: paths.flat(),
    fallback: true
  }
};


export const getStaticProps: GetStaticProps<{ subdomain: string; pages: string; slug: string; article: ArticleItem; articleComments: CommentProps[]; project: ProjectItem; projectComments: CommentProps[] }> = async (context) => {
   const { params } = context;
   if (!params || typeof params.subdomain !== 'string' || typeof params.pages !== 'string' || typeof params.slug !== 'string') {
     return {notFound:true}
  }
  
  const { subdomain, pages, slug } = params

  const user = await findUserByUsername(subdomain);
  const article = await getArticleBySlug(slug);
  const project = await getProjectBySlug(slug);
  const articleComments = await getFormatCommentsAndReplies(article?.id, pages);
  const projectComments = await getFormatCommentsAndReplies(project?.id, pages);


  if (!article || !articleComments || !project || !projectComments) {
    // return { notFound: true };
  }

 return {
   props: JSON.parse(JSON.stringify({ pages, subdomain, article, articleComments, project, projectComments })),
   revalidate: 1,
 };
};
