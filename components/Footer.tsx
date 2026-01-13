import React from 'react';
import { Locale } from '../types';

const DISCLAIMER_BY_LOCALE: Record<Locale, string> = {
  en:
    'This project (the Claude Cowork landing page) is an independent project created for learning and research ' +
    'and is not sponsored, endorsed, or affiliated with Anthropic (Claude) in any way. The product information ' +
    "shown on this page is compiled and inferred from public sources and does not represent Anthropic's official " +
    'position. For actual use of Claude Cowork, please rely on information and terms published by Anthropic.',
  zh:
    '本项目（Claude Cowork 落地页）是一个基于学习和研究兴趣创建的独立项目，并非由 Anthropic (Claude) 公司赞助、认可或以任何形式关联。' +
    '本页面所展示的产品信息仅基于公开资料进行整理和推测，不代表 Anthropic 官方立场。用户在使用 Claude Cowork 产品时，' +
    '应以 Anthropic 官方发布的信息和条款为准。',
  ja:
    '本プロジェクト（Claude Cowork ランディングページ）は学習・研究目的で作成された独立プロジェクトであり、Anthropic（Claude）社による後援、' +
    '承認、または提携は一切ありません。本ページの製品情報は公開情報に基づく整理と推測であり、Anthropic の公式見解を示すものではありません。' +
    'Claude Cowork を利用する際は、Anthropic が公式に公開する情報と条件に従ってください。',
  es:
    'Este proyecto (la página de aterrizaje de Claude Cowork) es un proyecto independiente creado con fines de aprendizaje ' +
    'e investigación y no está patrocinado, respaldado ni afiliado a Anthropic (Claude) de ninguna manera. La información del producto ' +
    'mostrada en esta página se compila e infiere a partir de fuentes públicas y no representa la posición oficial de Anthropic. ' +
    'Para el uso real de Claude Cowork, debe basarse en la información y los términos publicados oficialmente por Anthropic.',
  de:
    'Dieses Projekt (die Claude-Cowork-Landingpage) ist ein unabhängiges Projekt, das zu Lern- und Forschungszwecken erstellt wurde, ' +
    'und steht in keiner Weise unter Sponsoring, Zustimmung oder Verbindung mit Anthropic (Claude). Die auf dieser Seite dargestellten ' +
    'Produktinformationen sind aus öffentlichen Quellen zusammengestellt und abgeleitet und stellen keine offizielle Position von Anthropic dar. ' +
    'Für die tatsächliche Nutzung von Claude Cowork gelten die von Anthropic offiziell veröffentlichten Informationen und Bedingungen.',
  fr:
    "Ce projet (la page d'atterrissage Claude Cowork) est un projet indépendant créé à des fins d'apprentissage et de recherche et n'est ni " +
    "sponsorisé, ni approuvé, ni affilié à Anthropic (Claude) d'aucune manière. Les informations produit présentées sur cette page sont compilées " +
    "et déduites à partir de sources publiques et ne représentent pas la position officielle d'Anthropic. Pour l'utilisation réelle de Claude Cowork, " +
    'veuillez vous référer aux informations et conditions publiées officiellement par Anthropic.'
};

interface FooterProps {
  locale: Locale;
}

const Footer: React.FC<FooterProps> = ({ locale }) => {
  const disclaimer = DISCLAIMER_BY_LOCALE[locale] || DISCLAIMER_BY_LOCALE.en;
  
  // Get base path based on locale
  const getBasePath = () => {
    const localePaths: Record<Locale, string> = {
      en: '/en/',
      zh: '/zh/',
      ja: '/ja/',
      es: '/es/',
      de: '/de/',
      fr: '/fr/'
    };
    return localePaths[locale] || '/en/';
  };
  
  const basePath = getBasePath();
  
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto fixed bottom-0 left-0 right-0 md:left-[272px] z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Explore</p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={`${basePath}privacy.html`}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href={`${basePath}terms.html`}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Ref cases</p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://viecom.pro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                AI Ecommerce
              </a>
              <a 
                href="https://futurai.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                AI Education
              </a>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed pt-4 border-t border-slate-100">
          {disclaimer}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

