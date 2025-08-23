import { Metadata } from "next";
import { CircleHelp } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageTitles");
  const tDesc = await getTranslations("PageDescriptions");
  return {
    title: t("help"),
    description: tDesc("help"),
  };
}

function getFaqs(t: (key: string) => string) {
  return [
    {
      question: t("FaqQuestions.order_creation_process"),
      answer: t("FaqAnswers.order_creation_process"),
    },
    {
      question: t("FaqQuestions.how_to_create_incoming_waybill"),
      answer: t("FaqAnswers.how_to_create_incoming_waybill"),
    },
    {
      question: t("FaqQuestions.how_to_create_outgoing_waybill"),
      answer: t("FaqAnswers.how_to_create_outgoing_waybill"),
    },
    {
      question: t("FaqQuestions.how_to_create_order"),
      answer: t("FaqAnswers.how_to_create_order"),
    },
  ];
}

export default function Page() {
  const t = useTranslations();
  const title = useTranslations("PageTitles");
  const faqs = getFaqs(t);
  return (
    <>
      <div className="max-w-[85rem] container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
        {/* <!-- Title --> */}
        <div className="max-w-2xl mx-auto mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            {title("help")}
          </h2>
        </div>
        {/* <!-- End Title --> */}

        {/* <!-- FAQs --> */}
        <div className="max-w-2xl mx-auto divide-y divide-border">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-8 first:pt-0 last:pb-0">
              <div className="flex gap-x-5">
                <CircleHelp className="shrink-0 mt-1 size-6 text-muted-foreground" />
                <div className="grow">
                  <h3 className="md:text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-1 text-muted-foreground">
                    {faq.answer
                      .split("\n")
                      .map((line: string, index: number) => (
                        <span key={index}>
                          {line}
                          <br />
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
