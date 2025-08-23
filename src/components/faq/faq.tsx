import React from 'react';

const Faq = ({id, answer, question, priority}: Faq["listFaq"][0]) => {
    return (
        <details
            key={id}
            className="collapse collapse-arrow bg-base-200 rounded-2xl mb-3 shadow-sm"
        >
            <summary className="collapse-title text-base md:text-lg font-medium leading-7">
                <div className="flex items-center gap-2">
<span className="inline-flex text-white w-7 h-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm">
{priority}
</span>
                    <span>{question}</span>
                </div>
            </summary>
            <div className="collapse-content text-sm md:text-base leading-7">
                <p>{answer}</p>
            </div>
        </details>
    );
};

export default Faq;