import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const postuler = async (req, res) => {
  try {
    const { offreId } = req.body;
    const candidat = await prisma.candidat.findUnique({
      where: { userId: req.user.userId },
    });

    const candidature = await prisma.candidature.create({
      data: {
        offreId,
        candidatId: candidat.id,
      },
    });

    res.json({ message: "Candidature envoyée", candidature });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
