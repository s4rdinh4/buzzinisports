# Otimização completa de imagens e vídeos

## Objetivo
Reduzir o peso das fotos dos treinadores, vídeos e capas de depoimentos sem prejudicar a qualidade visual, evitando que mídias fora da primeira tela atrasem a abertura do site.

## Alterações
- Converter as fotos locais restantes dos treinadores para WebP redimensionado e substituir as referências pesadas.
- Recomprimir os três vídeos verticais com dimensões e taxa adequadas para exibição no site, áudio otimizado e reprodução progressiva.
- Converter as capas dos depoimentos para WebP e dimensioná-las para o tamanho real dos cards.
- Garantir que vídeos sejam baixados somente quando a pessoa clicar para assistir e que imagens fora da primeira tela usem carregamento adiado.
- Otimizar imagens decorativas ainda grandes quando houver ganho relevante, mantendo o Hero responsivo já otimizado.

## Validação
- Comparar pesos antes e depois.
- Conferir a página em computador e celular, incluindo fotos, capas e reprodução dos vídeos.
- Confirmar ausência de erros e carregamentos antecipados desnecessários.

## Detalhes técnicos
- Formatos: WebP para imagens; MP4/H.264 com `faststart` para compatibilidade ampla.
- Preservar proporções, enquadramento, conteúdo e aparência atual.
- Manter somente os arquivos otimizados usados pelo site, removendo duplicatas pesadas sem uso.
