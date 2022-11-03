-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "buttonsFontSize" INTEGER DEFAULT 24,
ALTER COLUMN "mainText" SET DEFAULT E'#8D929E',
ALTER COLUMN "mainTextColor" SET DEFAULT E'white',
ALTER COLUMN "mainTextFontSize" SET DEFAULT 48,
ALTER COLUMN "subTextFontSize" SET DEFAULT 36,
ALTER COLUMN "button1BackgroundColor" SET DEFAULT E'#047857',
ALTER COLUMN "button1TextColor" SET DEFAULT E'white',
ALTER COLUMN "button2BackgroundColor" SET DEFAULT E'whites',
ALTER COLUMN "button2TextColor" SET DEFAULT E'#007B54';
