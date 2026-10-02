import React from 'react';

interface Publication {
  text: string;
  link?: string;
}

const JOURNALS: Publication[] = [
  {
    text: 'Krupali Donda, Pankit Brahmkhatri, Biswjeet Dey, Yifan Zhu, Viacheslav Slesarenko, "Machine learning for inverse design of acoustic and elastic metamaterials", Current Opinion in Solid State and Materials Science 35, p. 101218 (2025)',
    link: 'https://doi.org/10.1016/j.cossms.2025.101218',
  },
  {
    text: 'Krupali Donda, Yifan Zhu, Sheng Wan, Badreddine Assouar, "Deep Learning Approach for Acoustic Absorbing Metasurface: Design with High Degrees of Freedom", Extreme Mechanics Letters, vol. 56, p. 101879 (2022)',
    link: 'https://doi.org/10.1016/j.eml.2022.101879',
  },
  {
    text: 'Krupali Donda, Yifan Zhu, Shi-Wang Fan, Liyun Cao, Yong Li, Badreddine Assouar, "Ultrathin acoustic absorbing metasurface based on deep learning approach", Smart materials and structures, Vol.30, no.8, p.30 085003 (2021)',
    link: 'https://iopscience.iop.org/article/10.1088/1361-665X/ac0675',
  },
  {
    text: 'Krupali Donda, Yifan Zhu, Shi-Wang Fan, Liyun Cao, Yong Li, Badreddine Assouar, "Extreme low-frequency ultrathin acoustic absorbing metasurface", Applied Physics Letters, Vol.115, no 17, p. 173506 (2019)',
    link: 'https://pubs.aip.org/aip/apl/article/115/17/173506/37861/Extreme-low-frequency-ultrathin-acoustic-absorbing',
  },
  {
    text: 'Yifan Zhu, Aurelien Merkel, Krupali Donda, Shiwang Fan, Liyun Cao, and Badreddine Assouar, "Nonlocal acoustic metasurface for ultra-broadband sound absorption", Phys. Rev. B, Vol.103, no 6, p. 064102 (2021)',
    link: 'https://journals.aps.org/prb/abstract/10.1103/PhysRevB.103.064102',
  },
  {
    text: 'Yifan Zhu, Shi-wang Fan, Liyun Cao, Krupali Donda, Shiwang Fan, Liyun Cao, and Badreddine Assouar, "Acoustic Meta-Equalizer", Phys. Rev. A, Vol.14, no 1, p. 014038 (2020)',
    link: 'https://journals.aps.org/prapplied/abstract/10.1103/PhysRevApplied.14.014038',
  },
  {
    text: 'Yifan Zhu, Krupali Donda, Shiwang Fan, Liyun Cao, Badreddine Assouar, "Broadband ultra-thin acoustic metasurface absorber with coiled structure", Applied Physics Express, Vol. 12, no 11, p. 114002 (2019)',
    link: 'https://iopscience.iop.org/article/10.7567/1882-0786/ab494a',
  },
  {
    text: 'Yifan Zhu, Fan Fei, Shiwang Fan, Liyun Cao, Krupali Donda, Badreddine Assouar, "Reconfigurable Origami-Inspired Metamaterials for Controllable Sound Manipulation", Physical Review Applied, Vol. 12, no 3, p. 034029 (2019)',
    link: 'https://journals.aps.org/prapplied/abstract/10.1103/PhysRevApplied.12.034029',
  },
  {
    text: 'Shi-Wang Fan, Sheng-Dong Zhao, Liyun Cao, Yifan Zhu, A-Li Chen, Yan-Feng Wang, Krupali Donda, Yue-Sheng Wang, Badreddine Assouar, "Reconfigurable curved metasurface for acoustic cloaking and illusion", Physical Review B, vol. 101, no 2, p. 024104 (2020)',
    link: 'https://journals.aps.org/prb/abstract/10.1103/PhysRevB.101.024104',
  },
  {
    text: 'Krupali Donda, Ravi S. Hegde, "Optimal Design of Beam-Deflectors Using Extended Unit-Cell Metagratings", Progress In Electromagnetics Research M, Vol. 77, 83-92. (2019)',
    link: 'https://www.semanticscholar.org/paper/OPTIMAL-DESIGN-OF-BEAM-DEFLECTORS-USING-EXTENDED-Donda-Hegde/fed8f3be4e7c99ca55b3cf1c8081ec2814a4d8fe',
  },
  {
    text: 'Krupali D. Donda, Ravi S. Hegde, "Rapid Design of Wide-Area Heterogeneous Electromagnetic Metasurfaces beyond the Unit-Cell Approximation", Progress In Electromagnetics Research M, Vol.60, 1-10 (2017)',
    link: 'https://arxiv.org/abs/1709.05919',
  },
  {
    text: 'Krupali Donda, Ravi Hegde, "Bilayered nanoantenna design improves the performance of silicon metasurfaces in the visible-wavelength region", J. Nanophoton, 11(4), 046002 (2017)',
    link: 'https://www.spiedigitallibrary.org/journals/journal-of-nanophotonics/volume-11/issue-04/046002/Bilayered-nanoantenna-design-improves-the-performance-of-silicon-metasurfaces-in/10.1117/1.JNP.11.046002.full',
  },
];

const CONFERENCES: Publication[] = [
  {
    text: 'Krupali Donda, Vatsal Patel, Yash Shah, Vimi Patel, "Physics-Validated Inverse Design of Broadband Low-Frequency Underwater Acoustic Metamaterials", META 2026: 16th International Conference on Metamaterials, Photonic Crystals and Plasmonics, Trinity College, Dublin (2026)',
  },
  {
    text: 'Vatsal Patel, Vimi Patel, Yash Shah, Krupali Donda, "Conditional Diffusion Modeling for Low-Frequency Underwater Acoustic Absorber Design", META 2026: 16th International Conference on Metamaterials, Photonic Crystals and Plasmonics, Trinity College, Dublin (2026)',
  },
  {
    text: 'Krupali Donda, "Temperature Tunability of Acoustic Metasurface Absorber for Low-Frequency", International Conference on Multidisciplinary Design Analysis and Optimization, IISc Bangalore (2024)',
  },
  {
    text: 'Nimit Patel, Raj Patel, Karnika Sojitra, Pratham Gandhi, Bishwjit Dey, Krupali Donda "A novel hybrid Walrus-JAYA algorithm for weighted economic emission dispatch on dynamic system", International Conference on Sustainable Power and Energy Research, NIT Warangal, India (2024)',
  },
  {
    text: 'Krupali Donda, Yifan Zhu, Aurelien Merkel, Sheng Wan, Badreddine Assouar, "Deep learning for accelerated modeling of ultrathin metasurface absorber", 15th International Congress on Artificial Materials for Novel Wave Phenomena-Metamaterials, New York, USA (2021)',
  },
  {
    text: 'Badreddine Assouar, Yifan Zhu, Krupali Donda "Absorbing Acoustic Metasurfaces for Low- Frequency Regime", 19th U.S. National Congress on Theoretical and Applied Mechanics, Texas, USA, (2022)',
  },
  {
    text: 'Krupali D. Donda, Ravi Hegde, "Evolutionary Algorithms for Designing Metalenses", 3rd IEEE International conference of Microwaves and Photonics, IIT-Dhanbad, India, (2017)',
  },
  {
    text: 'Krupali D. Donda, Ravi S. Hegde, "Improved Transmission Efficiency in Silicon-based Visible Wavelength Metasurface using Stepped Nanocone Elements", International Conference on Fiber Optics and Photonics-2016, IIT-Kanpur, (2016)',
  },
  {
    text: 'Vishal Vashistha, Krupali Donda, Kaustubh Panse, Ravi S. Hegde, "Design and Fabrication of CMOS Compatible Ultrathin Optical Component using Silicon Nanoantenna", National Symposium on Nano Science and Technology, IISc Banglore (2016)',
  },
  {
    text: 'Krupali D. Donda, Ravinder Kumar, Hitesh Pandya, "Design, Development, and Testing of Waveguide Taper for Millimeter Wave Transmission Line", International Journal on Microwave Applications, Volume-4 (2015)',
  },
  {
    text: 'Krupali Donda, Ravinder Kumar, Hitesh Pandya, "Numerical Study of Circular Waveguide Window for Millimeter-wave Transmission line using COMSOL Multiphysics v5.1", COMSOL International Conference, Pune, (2015)',
  },
];

export const PublicationsListSection: React.FC = () => {
  const journals = JOURNALS;
  const conferences = CONFERENCES;

  return (
    <section className="content-section" aria-label="Publication list">
      <h2 className="section-title reveal">Peer Reviewed Journals</h2>

      {journals.map((pub, idx) => (
        <div key={idx} className="pub-item stagger-item reveal">
          <p className="pub-text">{pub.text}</p>
          {pub.link && (
            <p className="pub-link">
              <a href={pub.link} target="_blank" rel="noopener noreferrer">
                {pub.link}
              </a>
            </p>
          )}
        </div>
      ))}

      <h2 className="section-title section-title--spaced reveal">Conference Proceedings</h2>

      {conferences.map((pub, idx) => (
        <div key={idx} className="pub-item stagger-item reveal">
          <p className="pub-text">{pub.text}</p>
          {pub.link && (
            <p className="pub-link">
              <a href={pub.link} target="_blank" rel="noopener noreferrer">
                {pub.link}
              </a>
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default PublicationsListSection;
