import os

base = 'src/app/dashboard'

pages = []

# Student placeholders (8)
for name in ['materi', 'quiz', 'ai-assistant', 'learning-index', 'progress', 'forum', 'event', 'pengaturan']:
    pages.append((f'{base}/siswa/{name}', 'Fitur Siswa', 'Fitur ini akan tersedia pada tahap pengembangan selanjutnya.', 'VD'))

# Teacher placeholders (10)
for name in ['materi', 'ai-generate-materi', 'ai-generate-quiz', 'bank-soal', 'monitoring-siswa', 'learning-index', 'analitik-kelas', 'forum', 'event', 'pengaturan']:
    pages.append((f'{base}/guru/{name}', 'Fitur Guru', 'Fitur ini akan tersedia pada tahap pengembangan selanjutnya.', 'VD'))

# Developer placeholders (4)
for name in ['event-forum', 'analytics', 'monitoring-sistem', 'pengaturan-platform']:
    pages.append((f'{base}/developer/{name}', 'Fitur Developer', 'Fitur ini akan tersedia pada tahap pengembangan selanjutnya.', 'VD'))

for dirpath, title, desc, icon in pages:
    os.makedirs(dirpath, exist_ok=True)
    with open(os.path.join(dirpath, 'page.tsx'), 'w', encoding='utf-8') as f:
        f.write('"use client";\n')
        f.write('import PlaceholderPage from "@/components/ui/PlaceholderPage";\n')
        f.write('export default function Page() {\n')
        f.write(f'  return <PlaceholderPage title="{title}" description="{desc}" icon="{icon}" features={{["Coming soon"]}} parentRoute="/dashboard" parentLabel="Dashboard" />;\n')
        f.write('}\n')

print(f'Created {len(pages)} placeholder pages')
