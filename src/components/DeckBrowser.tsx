"use client";

import { mockDecks } from "@/mock/data";
import { FullDeckDto } from "@/shared/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DeckBrowser() {
  const [decks, setDecks] = useState<FullDeckDto[]>(mockDecks);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log(search);
    let data = mockDecks;

    if (search.trim()) {
      data = data.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    setDecks(data);
  }, [search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* <p>Komponenta DeckBrowser je ovde</p> */}

        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="flex flex-col gap-4">
            {/* Search polje */}
            <input
              placeholder="Pretraga stranice..."
              className="w-full rounded border border-gray-200 px-3 py-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Dugme koje vodi na create deck stranicu */}
            <Link
              href="/deck-create"
              className="inline-flex rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              + Napravi špil
            </Link>
          </div>
        </aside>

        {/* Card */}
        <section className="flex-1">
          {decks.length === 0 ? (
            <p className="text-center text-gray-500">
              Nema spilova za dati filter!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {decks.map((deck, idx) => (
                <div
                  key={deck.id}
                  className="relative rounded-lg border border-gray-200"
                >
                  <Image
                    src={"https://picsum.photos/400/300"}
                    alt=""
                    width={400}
                    height={300}
                    className="w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{deck.name}</h3>
                    <p className="text-sm text-gray-500">{deck.subject.name}</p>
                  </div>
                  <Link
                    href={`/decks/${deck.id}`}
                    className="absolute inset-0"
                  ></Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
