"use client";

import OptimizedImage from "@/components/ui/optimized-image";
import {useTranslations} from "next-intl";

interface StoryBlock {
  imageKey: string;
  translationPrefix: string;
  imagePosition: "left" | "right";
}

const storyBlocks: StoryBlock[] = [
  {
    imageKey: "/assets/hero3", // placeholder — user will replace
    translationPrefix: "block1",
    imagePosition: "right",
  },
  {
    imageKey: "/assets/bali", // placeholder — user will replace
    translationPrefix: "block2",
    imagePosition: "left",
  },
  {
    imageKey: "/assets/lombok", // placeholder — user will replace
    translationPrefix: "block3",
    imagePosition: "right",
  },
];

export default function BrandStorySection() {
  const t = useTranslations("BrandStory");

  return (
    <section>
      {storyBlocks.map((block, index) => {
        const isImageLeft = block.imagePosition === "left";

        return (
          <div
            key={index}
            className={`flex flex-col ${
              isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
            } min-h-[50vh] md:min-h-[70vh]`}
          >
            {/* Image half */}
            <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-0">
              <OptimizedImage
                src={block.imageKey}
                alt={t(`${block.translationPrefix}.heading`)}
                fill
                objectFit="cover"
              />
            </div>

            {/* Text half */}
            <div className="w-full md:w-1/2 flex items-center">
              <div className="px-8 py-12 md:px-16 lg:px-20 max-w-xl">
                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-neutral mb-5 leading-tight">
                  {t(`${block.translationPrefix}.heading`)}
                </h2>
                <p
                  className="text-sm md:text-base text-gray-600 leading-relaxed mb-4"
                  style={{
                    fontFamily: "var(--font-lora), serif",
                    fontStyle: "italic",
                  }}
                >
                  {t(`${block.translationPrefix}.body1`)}
                </p>
                <p
                  className="text-sm md:text-base text-gray-600 leading-relaxed mb-6"
                  style={{
                    fontFamily: "var(--font-lora), serif",
                    fontStyle: "italic",
                  }}
                >
                  {t(`${block.translationPrefix}.body2`)}
                </p>
                <a
                  href={t(`${block.translationPrefix}.ctaHref`)}
                  className="inline-block bg-neutral text-white text-xs uppercase tracking-widest font-bold px-6 py-3 hover:bg-gray-800 transition-colors"
                >
                  {t(`${block.translationPrefix}.cta`)}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
