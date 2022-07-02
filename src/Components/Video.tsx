import { DefaultUi, Player, Vimeo} from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, LinkedinLogo } from "phosphor-react";

import '@vime/core/themes/default.css';
import { useGetLessonBySlugQuery } from "../graphql/generated";



interface VideoProps {
    lessonSlug: string;
}

export function Video(props: VideoProps) {
    const { data } = useGetLessonBySlugQuery({
        variables: {
            slug: props.lessonSlug,
        }
        
    })

    if (!data || !data.lesson) {
        return (
            <div className="flex-1">
                <p>Carregando...</p> {/* Fazer um looping para aparecer enquanto as informações não chegam */}
            </div>
        )
    }

    return (
        <div className="flex-1">
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player>
                        <Vimeo videoId={data.lesson.videoId} />
                        <DefaultUi />
                    </Player>
                </div>
            </div>
            <div className="p-8 max-w-[1100] mx-auto">
                <div className="flex items-start gap-16 description">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                            {data.lesson.title}
                        </h1>
                        <p className="mt-4 text-gray-200 leading-relaxed">
                            {data.lesson.description}
                        </p>

                        {data.lesson.teacher && (
                            <div className="flex items-center gap-4 mt-6">
                                <img
                                    className="h-16 w-16 rounded-full border-2 border-blue-600"
                                    src={data.lesson.teacher.avatarURL}
                                    alt=""
                                />

                                <div className="leading-relaxed">
                                    <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                                    <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <a href="" className="p-4 text-sm bg-blue-800 flex items-center rounded font-bold  uppercase gap-2 justify-center hover:bg-blue-900 transition-colors">
                            <DiscordLogo size={24} />
                            entre em contato
                        </a>

                        <a href={data.lesson.challenge?.url} className="p-4 text-sm border border-blue-500 flex  text-blue-500 items-center rounded font-bold  uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors">
                            <LinkedinLogo size={24} />
                            linkedin
                        </a>
                    </div>
                </div>

                <div className="gap-8 mt-20 grid grid-cols-2 cards">
                    <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
                        <div className="bg-blue-800 h-full p-6 flex items-center">
                            <FileArrowDown size={40} />
                        </div>

                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">
                                Material complementar
                            </strong>
                            <p className="text-sm text-gray-200 mt-2">
                                Acesse o material complementar para acelerar o seu desenvolvimento
                            </p>
                        </div>

                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>

                    <a href="" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
                        <div className="bg-blue-800 h-full p-6 flex items-center">
                            <FileArrowDown size={40} />
                        </div>

                        <div className="py-6 leading-relaxed">
                            <strong className="text-2xl">
                                Wallpapers exclusivos
                            </strong>
                            <p className="text-sm text-gray-200 mt-2">
                                Baixe wallpapers exclusivos e personalize a sua máquina
                            </p>
                        </div>

                        <div className="h-full p-6 flex items-center">
                            <CaretRight size={24} />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}