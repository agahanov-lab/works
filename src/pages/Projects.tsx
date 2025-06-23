import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from '@/hooks/use-pagination';
import { api } from '@/lib/api';

interface Project {
  _id: string;
  title: string;
  description: string;
  githubLink: string;
}

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        setAllProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const { 
    currentItems: projects, 
    currentPage, 
    totalPages, 
    goToPage, 
    nextPage, 
    previousPage,
    canNextPage,
    canPreviousPage 
  } = usePagination<Project>({ 
    items: allProjects, 
    itemsPerPage: 3 
  });

  const renderPaginationLinks = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => goToPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-primary via-accent to-math-purple bg-clip-text text-transparent">
          Projects
        </h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-primary via-accent to-math-purple bg-clip-text text-transparent">
        Projects
      </h1>
      
      {allProjects.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No projects available yet.
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                layoutId={project._id}
                onClick={() => setExpandedId(expandedId === project._id ? null : project._id)}
                className={`glass-effect rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  expandedId === project._id ? 'fixed inset-4 md:inset-20 z-50 overflow-y-auto' : ''
                }`}
              >
                <motion.h3
                  className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  layoutId={`title-${project._id}`}
                >
                  {project.title}
                </motion.h3>
                
                <AnimatePresence>
                  {expandedId === project._id ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <p className="text-lg text-muted-foreground">{project.description}</p>
                      
                      {project.githubLink && (
                        <div className="mt-6">
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-5 h-5" />
                            <span>View on GitHub</span>
                          </a>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.p className="text-muted-foreground line-clamp-3">
                      {project.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {expandedId && (
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedId(null)}
            />
          )}

          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                {canPreviousPage && (
                  <PaginationItem>
                    <PaginationPrevious onClick={previousPage} className="cursor-pointer" />
                  </PaginationItem>
                )}
                
                {renderPaginationLinks()}
                
                {canNextPage && (
                  <PaginationItem>
                    <PaginationNext onClick={nextPage} className="cursor-pointer" />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default Projects;
