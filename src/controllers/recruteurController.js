export const publierOffre = async (req, res) => {
  try {
    const { titre, description } = req.body;
    const recruteur = await prisma.recruteur.findUnique({
      where: { userId: req.user.userId },
    });

    const offre = await prisma.offre.create({
      data: { titre, description, recruteurId: recruteur.id },
    });

    res.json({ message: "Offre publiée", offre });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();