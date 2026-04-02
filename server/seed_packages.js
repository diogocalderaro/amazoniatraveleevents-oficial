
import fs from 'fs';
import path from 'path';

// Mapeamentos de imagens para seus caminhos originais
const imagesMap = {
  gal001: 'galeria/001.jpg',
  gal002: 'galeria/002.jpg',
  gal003: 'galeria/003.jpg',
  gal004: 'galeria/004.jpg',
  gal005: 'galeria/005.jpg',
  gal006: 'galeria/006.jpg',
  gal008: 'galeria/008.jpg',
  gal009: 'galeria/009.jpg',
  imgAquaMak: 'destinos/aqua_mak.jpg',
  imgCira: 'destinos/cira.jpg',
  imgEcoPark: 'destinos/eco_park.jpg',
  imgIsrael: 'destinos/ISRAEL2020.jpg',
  imgLagoRobertinho: 'destinos/lago_do_robertinho.jpg',
  imgLethem: 'destinos/compras_lethem.jpg',
  imgBoaVista: 'destinos/mao_boavista_mao.jpg',
  imgMargarita: 'destinos/ilha_margarita.jpg',
  imgMachupichu: 'destinos/machupichu.jpg',
  imgSafari: 'destinos/safari_amazonico.jpg',
};

// Dados raw para seed (Substituindo variáveis de imagem pelos nomes para mapear)
const packagesData = [
  {
    id: 'passeio-turistico-regional', slug: 'passeio-turistico-regional', title: 'Passeio Turístico Regional', location: 'Manaus, AM', price: 350, priceDisplay: 'Sob Consulta', duration: '1 Dia', rating: 4.9, reviews: 154, category: 'Natureza',
    image: 'gal001', features: ['Encontro das Águas', 'Turismo Indígena', 'Botos'], description: 'Um passeio completo para você conhecer as belezas naturais e culturais de Manaus. Saída todos os dias.',
    highlights: ['Encontro das Águas e Pesca do Pirarucu.', 'Visita à Vila de casas Flutuantes e Igarapés.', 'Caminhada na Selva e Visita à Árvore Sumaúma.', 'Parque Ecológico do Janauari e Vitória Régia.', 'Feirinha de Artesanatos e Tribo indígena.', 'Interação com os Botos.'],
    gallery: ['gal001', 'gal002', 'gal003', 'gal004'],
    itinerary: [{ day: 'Dia 1', title: 'Exploração Completa', description: 'Navegação fluvial pelo Rio Negro e Solimões, visitando os principais pontos turísticos regionais como Encontro das Águas, tribos indígenas e interação com botos.' }],
    included: ['Transporte Fluvial', 'Guia Local', 'Taxas de visitação e atividades'], excluded: ['Alimentação não especificada', 'Gorjetas']
  },
  {
    id: 'compras-lethem-marco', slug: 'compras-lethem-marco', title: 'Excursão de Compras em Lethem (Março)', location: 'Lethem, Guiana', price: 350, priceDisplay: 'R$ 350,00', oldPrice: 390, installments: 6, installmentPrice: 65.00, duration: 'Bate Volta', rating: 4.8, reviews: 82, category: 'Compras',
    image: 'imgLethem', features: ['Transporte Semi-leito', 'Lojas Isentas', 'Guia'], description: "Aproveite a Black Friday Fora de Época na fronteira com a Guiana Mencionando: Victoria's Secret, Kipling, Michael Kors, Louis Vuitton, Gucci, Tommy Hilfiger, JBL. Bate e volta entre 27 a 29 de Março 2026.",
    highlights: ['Transporte Rodoviário Semi-leito de alta qualidade.', 'Acompanhamento de Operador/Guia durante a viagem.', 'Água mineral inclusa.', 'Lojas isentas de impostos.', 'Pagamento facilitado: 6x R$ 65,00 ou à vista R$ 350,00.'],
    gallery: ['imgLethem', 'gal005'],
    itinerary: [
      { day: 'Dia 27', title: 'Saída de Manaus', description: 'Embarque à noite com destino a Lethem.' },
      { day: 'Dia 28', title: 'Dia de Compras', description: 'Chegada na fronteira e dia livre para compras nas principais lojas da região.' },
      { day: 'Dia 29', title: 'Retorno', description: 'Chegada em Manaus e final da excursão.' }
    ],
    included: ['Translado Ida e Volta (Semi-Leito)', 'Água Mineral', 'Operador/Guia'], excluded: ['Hospedagem', 'Alimentação', 'Compras pessoais']
  },
  {
    id: 'pascoa-lago-robertinho', slug: 'pascoa-lago-robertinho', title: 'Excursão de Páscoa - Lago Robertinho + Aqua Mak', location: 'Boa Vista, RR', price: 780, priceDisplay: 'R$ 780,00', oldPrice: 900, installments: 10, installmentPrice: 90.00, duration: '4 Dias', rating: 4.9, reviews: 121, category: 'Lazer',
    image: 'imgLagoRobertinho', features: ['Hospedagem', 'Entrada Atrações', 'Transporte'], description: 'Aproveite o feriado de Páscoa (02 a 05 de Abril 2026) para relaxar no paraíso caribenho de Roraima: o Lago do Robertinho e o parque aquático Aqua Mak.',
    highlights: ['Entradas nos atrativos (Lago do Robertinho e Aqua Mak) inclusas.', 'Hospedagem com café da manhã confortável.', 'Translado de ônibus rodoviário seguro.', 'Diversão garantida para a família.', 'Facilidade: 10x R$ 90,00 ou à vista R$ 780,00.'],
    gallery: ['imgLagoRobertinho', 'imgAquaMak', 'imgBoaVista'],
    itinerary: [
      { day: 'Dia 02', title: 'Saída de Manaus', description: 'Embarque rumo a Boa Vista.' },
      { day: 'Dia 03', title: 'Lago do Robertinho', description: 'Dia relaxante no Lago do Robertinho, desfrutando das águas cristalinas.' },
      { day: 'Dia 04', title: 'Aqua Mak', description: 'Diversão no Aqua Mak com toboáguas e lazer.' },
      { day: 'Dia 05', title: 'Retorno', description: 'Viagem de volta para Manaus.' }
    ],
    included: ['Translado de Ônibus', 'Entrada nos Atrativos', 'Hospedagem com Café da Manhã', 'Acompanhamento de Guia', 'Seguro Viagem', 'Água Mineral'], excluded: ['Almoço e Jantar', 'Bebidas e Despesas Extras']
  },
  {
    id: 'compras-lethem-abril', slug: 'compras-lethem-abril', title: 'Excursão de Compras em Lethem (Abril)', location: 'Lethem, Guiana', price: 400, priceDisplay: 'R$ 400,00', oldPrice: 450, installments: 6, installmentPrice: 75.00, duration: 'Bate Volta', rating: 4.7, reviews: 65, category: 'Compras',
    image: 'imgLethem', features: ['Transporte Semi-leito', 'Lojas Isentas', 'Guia'], description: "Renove seu guarda-roupa e compre eletrônicos na Guiana! Victoria's Secret - Kipling - Michael Kors - Louis Vuitton - Gucci - JBL. Bate e volta entre 10 a 12 de Abril 2026.",
    highlights: ['Transporte Rodoviário Semi-leito de qualidade.', 'Operador acompanhando o grupo.', 'Acesso a lojas internacionais isentas.', 'Pagamento facilitado: 6x R$ 75,00 ou à vista R$ 400,00.'],
    gallery: ['imgLethem', 'gal006'],
    itinerary: [
      { day: 'Dia 10', title: 'Embarque', description: 'Saída de Manaus à noite.' },
      { day: 'Dia 11', title: 'Compras em Lethem', description: 'Dia inteiro dedicado às compras internacionais nas lojas parceiras.' },
      { day: 'Dia 12', title: 'Retorno para Casa', description: 'Volta para Manaus.' }
    ],
    included: ['Translado Ida e Volta (Semi-Leito)', 'Água Mineral', 'Operador/Guia'], excluded: ['Hospedagem', 'Refeições', 'Despesas pessoais']
  },
  {
    id: 'feriado-trabalhador-roraima', slug: 'feriado-trabalhador-roraima', title: 'Feriado do Trabalhador em Roraima (Robertinho + Mak)', location: 'Boa Vista, RR', price: 780, priceDisplay: 'R$ 780,00', oldPrice: 900, installments: 10, installmentPrice: 90.00, duration: '4 Dias', rating: 4.9, reviews: 80, category: 'Lazer',
    image: 'imgBoaVista', features: ['Hospedagem', 'Seguro Viagem', 'Diversão'], description: 'Aproveite o feriadão do trabalhador (30 de Abril a 03 de Maio 2026) em Boa Vista. Conheça as belezas do Lago do Robertinho e passe um dia inesquecível no Aqua Mak com conforto e segurança.',
    highlights: ['Viagem segura em ônibus rodoviário.', 'Ingressos para o Lago do Robertinho e Aqua Mak incluídos.', 'Hospedagem com 1 café da manhã.', 'Acompanhamento completo e seguro viagem.', 'Pacotes INDIVIDUAL - 10x R$ 90,00 ou à vista R$ 780,00.'],
    gallery: ['imgBoaVista', 'imgLagoRobertinho', 'imgAquaMak'],
    itinerary: [
      { day: 'Dia 30', title: 'Início da Viagem', description: 'Embarque em Manaus rumo a Roraima.' },
      { day: 'Dia 01', title: 'Dia do Trabalhador Relaxante', description: 'Chegada e acomodação. Conhecendo o atrativo.' },
      { day: 'Dia 02', title: 'Aqua Mak e Diversão', description: 'Aproveitando o dia no parque aquático e áreas de lazer naturais.' },
      { day: 'Dia 03', title: 'Retorno a Manaus', description: 'Embarque para o retorno programado.' }
    ],
    included: ['Translado de Ônibus', 'Entrada nos atrativos', 'Hospedagem (1 Café da Manhã)', 'Água Mineral durante viagem', 'Seguro Viagem', 'Guia'], excluded: ['Demais refeições', 'Passeios extras opcionais não descritos']
  },
  {
    id: 'compras-lethem-maio', slug: 'compras-lethem-maio', title: 'Excursão de Compras em Lethem (Maio)', location: 'Lethem, Guiana', price: 400, priceDisplay: 'R$ 400,00', oldPrice: 450, installments: 6, installmentPrice: 75.00, duration: 'Bate Volta', rating: 4.8, reviews: 73, category: 'Compras',
    image: 'imgLethem', features: ['Transporte Semi-leito', 'Compras', 'Guia'], description: "Nossa clássica viagem de compras Bate e Volta para Lethem. Aproveite para passear e comprar marcas como Victoria's Secret, Kipling, Michael Kors, Louis Vultton, Gucci, Tommy Hilfiger, JBL. Entre 01 a 03 de Maio 2026.",
    highlights: ['Transporte confortável em ônibus semi-leito.', 'Guia para acompanhar na travessia e lojas.', 'Marcas importadas com desconto.', 'Pagamento facilitado: 6x R$ 75,00 ou à vista R$ 400,00.'],
    gallery: ['imgLethem', 'gal004'],
    itinerary: [
      { day: 'Dia 01', title: 'Partida', description: 'Embarque pela noite de Manaus em ônibus confortável.' },
      { day: 'Dia 02', title: 'Compras Ilimitadas', description: 'O dia todo para conhecer os catálogos e promoções nas lojas de fronteira.' },
      { day: 'Dia 03', title: 'Retorno a Manaus', description: 'Viagem de volta.' }
    ],
    included: ['Translado (Semi-Leito)', 'Água Mineral', 'Operador Responsável'], excluded: ['Alimentação não programada', 'Hospedagem', 'Excesso de bagagem']
  },
  {
    id: 'aqua-mak', slug: 'aqua-mak', title: 'Aqua MAK - Parque Aquático', location: 'Boa Vista, RR', price: 150, duration: '1 Dia', rating: 4.8, reviews: 42, category: 'Lazer',
    image: 'imgAquaMak', features: ['Piscinas', 'Toboáguas', 'Área de Lazer'], description: 'Oportunidade ideal para relaxar! O Aqua MAK em Boa Vista oferece a melhor infraestrutura.',
    highlights: ['Lazer aquático','Estrutura completa','Ideal para famílias'], gallery: ['imgAquaMak', 'gal001'],
    itinerary: [{ day: '1', title: 'Parque', description: 'Dia de parque' }], included: ['Ingresso'], excluded: ['Transporte']
  },
  {
    id: 'cirandeira-bela', slug: 'cirandeira-bela', title: 'Cirandeira Bela Eco Resort', location: 'Presidente Figueiredo, AM', price: 250, duration: '1 Dia', rating: 4.9, reviews: 55, category: 'Natureza',
    image: 'imgCira', features: ['Cachoeiras', 'Trilhas', 'Day Use'], description: 'Day Use completo em Presidente Figueiredo, terra das cachoeiras.',
    highlights: ['Cachoeiras relaxantes','Day Use','Comida regional'], gallery: ['imgCira', 'gal002'],
    itinerary: [{ day: '1', title: 'Day Use', description: 'Aproveitamento das instalações.' }], included: ['Entrada resort'], excluded: ['Alimentação']
  },
  {
    id: 'eco-park', slug: 'eco-park', title: 'Amazon Ecopark Lodge', location: 'Manaus, AM', price: 450, duration: '1 Dia', rating: 4.7, reviews: 21, category: 'Natureza',
    image: 'imgEcoPark', features: ['Macacos', 'Trilhas', 'Almoço Regional'], description: 'Passar o dia em um dos lodges ecológicos mais tradicionais de Manaus.',
    highlights: ['Visita floresta dos macacos','Almoço ribeirinho','Trilhas guiadas'], gallery: ['imgEcoPark', 'gal003'],
    itinerary: [{ day: '1', title: 'Lodge', description: 'Atividades em Lodge' }], included: ['Alimentação (Almoço)'], excluded: ['Bebidas']
  },
  {
    id: 'israel-tour', slug: 'israel-tour', title: 'Caravana Terra Santa - Israel', location: 'Israel, Oriente Médio', price: 15800, duration: '12 Dias', rating: 5.0, reviews: 12, category: 'Internacional',
    image: 'imgIsrael', features: ['Guia em Português', 'Hotéis 5*', 'Passeios Bíblicos'], description: 'Experimente andar por onde Jesus andou, vivendo a magia de Jerusalém e Israel.',
    highlights: ['Mar da Galileia','Muro das Lamentações','Hotéis de Luxo'], gallery: ['imgIsrael', 'gal004'],
    itinerary: [{ day: '1-12', title: 'Tour Terra Santa', description: 'Roteiro bíblico completo em Israel' }], included: ['Voo', 'Hospedagem', 'Transfer', 'Passeios'], excluded: ['Taxas Extras']
  },
  {
    id: 'lago-robertinho', slug: 'lago-robertinho', title: 'Lago do Robertinho', location: 'Boa Vista, RR', price: 180, duration: '1 Dia', rating: 4.8, reviews: 38, category: 'Lazer',
    image: 'imgLagoRobertinho', features: ['Lago Cristalino', 'Gastronomia', 'Descanso'], description: 'Venha desfrutar das belas praias de águas doces em Roraima e se conectar com a natureza!',
    highlights: ['Praia cristalina', 'Relaxamento ao sol'], gallery: ['imgLagoRobertinho', 'gal005'],
    itinerary: [{ day: '1', title: 'Lazer no Lago', description: 'Passar o dia usufruindo a área do lago.' }], included: ['Acesso ao Lago'], excluded: ['Consumo Gastronômico']
  },
  {
    id: 'lethem-compras', slug: 'lethem-compras', title: 'Compras em Lethem', location: 'Lethem, Guiana', price: 350, duration: '1 Dia', rating: 4.6, reviews: 154, category: 'Compras',
    image: 'imgLethem', features: ['Lojas Isentas', 'Transporte', 'Guias'], description: 'Bate Volta tradicional, sem datas atreladas, pacotes avulsos para conhecer a fronteira.',
    highlights: ['Compras', 'Conforto', 'Marcas'], gallery: ['imgLethem', 'gal006'],
    itinerary: [{ day: '1', title: 'Compras e Retorno', description: 'Dia livre nas lojas da Guiana.' }], included: ['Transporte Padrão'], excluded: ['Compras e alimentação']
  },
  {
    id: 'boa-vista-city', slug: 'boa-vista-city', title: 'City Tour Boa Vista', location: 'Boa Vista, RR', price: 120, duration: '1 Dia', rating: 4.7, reviews: 80, category: 'Cultura',
    image: 'imgBoaVista', features: ['Pontos Históricos', 'Praias de Rio', 'Parques'], description: 'Conheça o centro histórico, pontos turísticos, feiras e muito mais.',
    highlights: ['Praça das Águas', 'Centro Cívico', 'Monumento ao Garimpeiro'], gallery: ['imgBoaVista', 'gal001'],
    itinerary: [{ day: '1', title: 'Passeio pela Cidade', description: 'Passagem pelos principais pontos de BV.' }], included: ['Transporte de Tour e Guia'], excluded: ['Alimentação']
  },
  {
    id: 'margarita-island', slug: 'margarita-island', title: 'Ilha de Margarita', location: 'Venezuela', price: 2800, duration: '5 Dias', rating: 4.5, reviews: 200, category: 'Internacional',
    image: 'imgMargarita', features: ['Praias Paradisíacas', 'All Inclusive', 'Compras'], description: 'Viva uma imersão caribenha na Ilha de Margarita. Os melhores resorts e praias azuis.',
    highlights: ['All-inclusive','Praias espetaculares','Compras Duty Free'], gallery: ['imgMargarita', 'gal002'],
    itinerary: [{ day: '1-5', title: 'Férias Caribenhas', description: 'Relaxamento total na Venezuela.' }], included: ['Hospedagem All-inclusive (resort definido)', 'Transporte ida e volta'], excluded: ['Taxas extras']
  },
  {
    id: 'machupichu-exp', slug: 'machupichu-exp', title: 'Expedição Machu Picchu', location: 'Peru', price: 5500, duration: '8 Dias', rating: 5.0, reviews: 95, category: 'Internacional',
    image: 'imgMachupichu', features: ['Cusco', 'Vale Sagrado', 'Trem de Luxo'], description: 'Passeio inesquecível pelo berço do império Inca. Visitas inesquecíveis.',
    highlights: ['Ingresso Machu Picchu','Trem panorâmico Vistadome','Cusco City Tour'], gallery: ['imgMachupichu', 'gal003'],
    itinerary: [{ day: '1-8', title: 'Imersão no Peru', description: 'Explorando Cusco, Vale Sagrado e a Maravilha do Mundo.' }], included: ['Hotéis', 'Café da manhã', 'Translados locais', 'Ingressos Inca'], excluded: ['Passagens aéreas internacionais até Lima']
  },
  {
    id: 'safari-amazonico', slug: 'safari-amazonico', title: 'Safari Amazônico', location: 'Rio Negro, AM', price: 380, duration: '1 Dia', rating: 4.9, reviews: 140, category: 'Aventura',
    image: 'imgSafari', features: ['Botos Cor-de-rosa', 'Tribos Indígenas', 'Igapós'], description: 'Navegação maravilhosa para viver a verdadeira alma amazônica. Interaja com botos e visite aldeias.',
    highlights: ['Interação Botos', 'Aldeia Dessana', 'Navegação Rio Negro'], gallery: ['imgSafari', 'gal004'],
    itinerary: [{ day: '1', title: 'Full Day Safari', description: 'Translados de barco e atividades.' }], included: ['Transporte de barco', 'Almoço em flutuante'], excluded: ['Bebidas Extras']
  }
];

// Helper to copy and get URL
function processImage(imageKey) {
  if (!imageKey || !imagesMap[imageKey]) return null;
  const relPath = imagesMap[imageKey];
  const srcExt = path.extname(relPath);
  const newName = imageKey + '_' + Date.now() + srcExt;
  
  const srcFile = path.resolve('../src/assets', relPath);
  const destFile = path.resolve('./uploads', newName);
  
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    return '/uploads/' + newName;
  }
  return null;
}

async function seed() {
  console.log('Logging in...');
  const loginRes = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@amazoniatravel.com', password: 'admin123' })
  });
  
  const loginData = await loginRes.json();
  const token = loginData.token;
  
  if (!token) {
    console.error('Failed to login:', loginData);
    process.exit(1);
  }

  const existingRes = await fetch('http://localhost:3001/api/packages');
  const existing = await existingRes.json();
  
  for (const pkg of packagesData) {
    if (existing.find(e => e.slug === pkg.slug)) {
      console.log(`Skipping existing package ${pkg.slug}`);
      continue;
    }
    
    const mainImageUrl = processImage(pkg.image) || null;
    
    const galleryUrls = [];
    if (pkg.gallery) {
      pkg.gallery.forEach((imgKey) => {
        const url = processImage(imgKey);
        if (url) galleryUrls.push(url);
      });
    }

    const payload = {
      title: pkg.title,
      slug: pkg.slug,
      location: pkg.location,
      price: pkg.price,
      price_display: pkg.priceDisplay,
      old_price: pkg.oldPrice,
      installments: pkg.installments,
      installment_price: pkg.installmentPrice,
      duration: pkg.duration,
      category: pkg.category,
      description: pkg.description,
      image_url: mainImageUrl,
      highlights: pkg.highlights || [],
      itinerary: pkg.itinerary || [],
      included: pkg.included || [],
      excluded: pkg.excluded || [],
      features: pkg.features || [],
      gallery: galleryUrls
    };

    const res = await fetch('http://localhost:3001/api/packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    
    if (res.ok) {
      const data = await res.json();
      console.log(`Inserted package ${pkg.title} with ID ${data.id}`);
    } else {
      console.error(`Failed to insert ${pkg.title}`, await res.text());
    }
  }
  
  console.log('Seed completed.');
  process.exit(0);
}

seed();
