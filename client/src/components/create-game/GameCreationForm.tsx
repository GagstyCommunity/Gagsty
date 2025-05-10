import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { createGameSchema, type CreateGameFormData } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GAME_TYPES, MONETIZATION_OPTIONS } from "@/config/gameTypes";
import { FaWandMagicSparkles, FaQuestionCircle, FaUpload } from "react-icons/fa";

const GameCreationForm = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [wordCount, setWordCount] = useState(0);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<CreateGameFormData>({
    resolver: zodResolver(createGameSchema),
    defaultValues: {
      title: "",
      prompt: "",
      gameType: "mini-app",
      monetization: ["in-game-chips"]
    }
  });
  
  const watchPrompt = watch("prompt");
  
  // Update word count on prompt change
  useState(() => {
    if (watchPrompt) {
      const count = watchPrompt.trim().split(/\s+/).filter(Boolean).length;
      setWordCount(count);
    } else {
      setWordCount(0);
    }
  });
  
  // Create game mutation
  const createGameMutation = useMutation({
    mutationFn: async (data: CreateGameFormData) => {
      const response = await apiRequest("POST", "/api/games", data);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/games'] });
      queryClient.invalidateQueries({ queryKey: ['/api/games/featured'] });
      
      toast({
        title: "Game created successfully!",
        description: "Your game is now being processed and will be available soon.",
        variant: "default",
      });
      
      reset();
      navigate(`/game/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Failed to create game",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: CreateGameFormData) => {
    createGameMutation.mutate(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Game Title</label>
        <Input
          id="title"
          placeholder="Enter a catchy title for your game"
          className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">Game Prompt (Idea)</label>
        <Textarea
          id="prompt"
          rows={5}
          placeholder="Describe your game idea, genre, characters, mechanics, and anything else you want to include (150 words max)"
          className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
          {...register("prompt")}
          onChange={(e) => {
            register("prompt").onChange(e);
            const count = e.target.value.trim().split(/\s+/).filter(Boolean).length;
            setWordCount(count);
          }}
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${wordCount > 150 ? 'text-destructive' : 'text-gray-500'}`}>
            {wordCount}/150 words
          </span>
        </div>
        {errors.prompt && (
          <p className="mt-1 text-sm text-destructive">{errors.prompt.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Game Type</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {GAME_TYPES.map((type) => (
            <div key={type.id} className="relative">
              <input
                type="radio"
                id={type.id}
                value={type.id}
                className="peer absolute opacity-0"
                {...register("gameType")}
              />
              <label
                htmlFor={type.id}
                className={`flex flex-col items-center justify-center p-4 bg-gray-800/80 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-[${type.iconColor}] peer-checked:bg-[${type.iconColor}]/20 transition-all`}
              >
                {type.id === 'mini-app' && <FaTelegram className={`text-2xl text-[${type.iconColor}] mb-2`} />}
                {type.id === 'web-game' && <FaWandMagicSparkles className={`text-2xl text-[${type.iconColor}] mb-2`} />}
                {type.id === 'mobile' && <FaWandMagicSparkles className={`text-2xl text-[${type.iconColor}] mb-2`} />}
                <span className="text-sm font-medium">{type.name}</span>
              </label>
            </div>
          ))}
        </div>
        {errors.gameType && (
          <p className="mt-1 text-sm text-destructive">{errors.gameType.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Monetization</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MONETIZATION_OPTIONS.map((option) => (
            <div key={option.id} className="relative">
              <input
                type="checkbox"
                id={option.id}
                value={option.id}
                className="peer absolute opacity-0"
                {...register("monetization")}
              />
              <label
                htmlFor={option.id}
                className={`flex items-center p-3 bg-gray-800/80 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-[${option.iconColor}] peer-checked:bg-[${option.iconColor}]/10 transition-all`}
              >
                <FaWandMagicSparkles className={`text-[${option.iconColor}] mr-3`} />
                <span className="text-sm">{option.name}</span>
              </label>
            </div>
          ))}
        </div>
        {errors.monetization && (
          <p className="mt-1 text-sm text-destructive">{errors.monetization.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Upload Assets (Optional)</label>
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center">
            <FaUpload className="text-gray-500 text-2xl mb-2" />
            <p className="text-sm text-gray-400 mb-2">Drag and drop image files or</p>
            <Button 
              type="button" 
              variant="secondary"
              className="bg-gray-800 hover:bg-gray-700 text-white"
            >
              Browse Files
            </Button>
            <p className="mt-2 text-xs text-gray-500">PNG, JPG, SVG (Max: 5MB each)</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-center gap-4">
        <Button 
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white primary-glow"
          disabled={createGameMutation.isPending}
        >
          <FaWandMagicSparkles className="mr-2" />
          {createGameMutation.isPending ? "Creating..." : "Create Game Now"}
        </Button>
        <Button 
          type="button" 
          variant="ghost"
          className="border border-gray-700 text-white bg-gray-800 hover:bg-gray-700"
        >
          <FaQuestionCircle className="mr-2" />
          See Examples
        </Button>
      </div>
    </form>
  );
};

export default GameCreationForm;
