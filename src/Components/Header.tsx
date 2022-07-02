import { Logo } from "./Logo";
import { useState } from 'react';
import { Lesson } from "./Lesson";

import { useGetLessonsQuery } from "../graphql/generated";


export function Header() {
    const { data } = useGetLessonsQuery()

    const [active, setMode] = useState(false);
    const ToggleMode = () => {
        setMode(!active)
    }

    return (
        <header className="w-full py-5 flex items-center justify-between bg-gray-700 border-b border-gray-600">
            <div className="ml-6">
                <Logo />
            </div>
            <nav>
                <div className={active ? 'mobile-menu active' : 'mobile-menu'} onClick={ToggleMode}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
                
                <div className={active ? 'nav-list active' : 'nav-list'} onClick={ToggleMode}>
                    {data?.lessons.map(lesson => {
                        return (
                            <Lesson
                                key={lesson.id}
                                title={lesson.title}
                                slug={lesson.slug}
                                availableAt={new Date(lesson.availableAt)}
                                type={lesson.lessonType}
                            />
                        )
                    })}
                </div>
            </nav>
        </header>
    )
}