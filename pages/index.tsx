import Link from 'next/link';
import * as fs from 'fs';
import * as path from 'path';
import Header from './components/Header';
import ThemeProvider  from './context/ThemeContext';

interface HomeProps {
    slugs: string[];
}
const Home: React.FC<HomeProps> = ({ slugs }) => (
        <div className="bg-white dark:bg-slate-800 h-full min-h-screentext-black dark:text-white">
            <Header />
            <main className='p-2 flex flex-col gap-2 center'>
                <h1  className="text-3xl font-bold text-[#a855f7] underline">
                    Slugs:
                </h1>
                {slugs.map(slug => (
                    <div key={slug}>
                        <Link href={`/blog/` + slug} className='inline-block px-4 py-2 border border-[#a855f7] rounded-lg hover:bg-amber-800 hover:text-white transition'>
                            {slug}
                        </Link>
                    </div>
                ))}
            </main>
        </div>
);

export const getStaticProps = async () => {
    const postsDirectory = path.join(process.cwd(), 'posts');

    if (!fs.existsSync(postsDirectory)) {
        return {
            props: {
                slugs: []
            }
        };
    }

    const files = fs.readdirSync(postsDirectory);
    return {
        props: {
            slugs: files.map((file) => file.replace(/\.md$/, '')),
        },
    };
};


export default Home;
