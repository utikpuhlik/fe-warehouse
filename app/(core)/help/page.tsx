import {Metadata} from "next";
import {CircleHelp} from "lucide-react";
import {useTranslations} from "next-intl";

export const metadata: Metadata = {
    title: 'Помощь | TCF',
    description: "Внутренняя документация бизнес-процессов TCF",
}

const faqs = [
    {
        question: "Процесс - Создание заказа",
        answer:
            "1. Корзина собрана - подтверждение\n" +
            "2. Автоматически создается заказ со статусом `Новый`\n" +
            "3. Печать - передача кладовщику `Сборка`\n" +
            "4. Контакт клиента - финальное подтверждение\n" +
            "5. Создание накладной из заказа для внесения изменений на склад\n" +
            "6. Отправка и перевод в состояние `Выполнен`",

    },
    {
        question: "Как создать ПРИХОДНУЮ/ВОЗВРАТНУЮ накладную?",
        answer:
            "Вы можете создать накладную из корзины, выбрав её тип и указав клиента, или же со страницы Накладные, нажав создать."
    },
    {
        question: "Как создать РАСХОДНУЮ накладную?",
        answer:
            "Для создания расходной накладной необходим заказ, который можно конвертировать в накладную. Как либо изменять расходную накладную нельзя, она должна всегда соответствовать заказу."
    },
    {
        "question": "Как создать заказ?",
        answer:
            "Заказ создается автоматически при подтверждении в корзине.\n" +
            "Любые изменения в заказе отобразятся у клиента в личном кабинете."
    }
];


export default function Page() {
    const t = useTranslations('HomePage');
    return (
        <>
            <div className="max-w-[85rem] container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
                {/* <!-- Title --> */}
                <div className="max-w-2xl mx-auto mb-10 lg:mb-14">
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
                        {t('title')}
                    </h2>
                </div>
                {/* <!-- End Title --> */}

                {/* <!-- FAQs --> */}
                <div className="max-w-2xl mx-auto divide-y divide-border">
                    {faqs.map((faq) => (
                        <div key={faq.question} className="py-8 first:pt-0 last:pb-0">
                            <div className="flex gap-x-5">
                                <CircleHelp className="shrink-0 mt-1 size-6 text-muted-foreground"/>
                                <div className="grow">
                                    <h3 className="md:text-lg font-semibold">{faq.question}</h3>
                                    <p className="mt-1 text-muted-foreground">
                                        {faq.answer.split("\n").map((line, index) => (
                                            <span key={index}>
                                                    {line}
                                                <br/>
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <!-- End FAQs --> */}
            </div>
        </>
    );
}